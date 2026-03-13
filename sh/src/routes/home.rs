use iocraft::prelude::*;

use crate::components::BigBanner;
use crate::components::BrowserHelp;
use crate::components::DictBlock;
use crate::components::TextBlock;

const ABOUT: &str = "\
    Howdy, I'm Dallin.\
    \n\n\
    Connect with me on my socials or use this site \
    to keep up on my work.
    ";

const SOCIALS: &[(&str, &str)] = &[
    ("   GitHub", "https://dallinhuff.com/github"),
    (" LinkedIn", "https://dallinhuff.com/linkedin"),
    ("Instagram", "https://dallinhuff.com/instagram"),
    ("  Discord", "https://dallinhuff.com/discord"),
];

pub fn page() -> AnyElement<'static> {
    element! {
        View(flex_direction: FlexDirection::Column) {
            BrowserHelp()

            View(
                width: 90,
                flex_direction: FlexDirection::Column,
                align_items: AlignItems::Stretch,
                border_style: BorderStyle::Round,
                border_color: Color::DarkGrey,
            ) {
                BigBanner()

                View(
                    padding_left: 1,
                    padding_right: 1,
                    column_gap: 1,
                ) {
                    TextBlock(title: "About", content: ABOUT, basis: FlexBasis::Percent(40.0))
                    DictBlock(title: "Socials", basis: FlexBasis::Percent(60.0), entries: SOCIALS)
                }

                View(margin: 1, margin_left: 3, flex_direction: FlexDirection::Column, row_gap: 1) {
                    Text(content: "Legend", color: Color::Yellow, weight: Weight::Bold)

                    View() {
                        MixedText(contents: vec![
                            MixedTextContent::new("$ curl").color(Color::Cyan),
                            MixedTextContent::new(" -L sh.dallinhuff.com     "),
                            MixedTextContent::new("Get this page").color(Color::Magenta).italic(),
                        ])
                    }
                }
            }
        }
    }
    .into_any()
}

#[cfg(test)]
mod tests {
    use super::*;

    fn get_rendered_output(color: bool) -> String {
        let mut output = Vec::new();
        if color {
            page().render(None).write_ansi(&mut output).unwrap();
        } else {
            page().render(None).write(&mut output).unwrap();
        }

        String::try_from(output).unwrap()
    }

    #[test]
    fn page_is_below_max_width() {
        let max_width = 90; // TODO: I'd like to get this down to 80

        let output = get_rendered_output(false);

        assert!(output.lines().all(|l| l.chars().count() <= max_width));
    }
}
