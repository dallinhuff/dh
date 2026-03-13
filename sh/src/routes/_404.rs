use iocraft::prelude::*;

use crate::components::{BrowserHelp, TextBlock};

#[component]
fn Banner() -> impl Into<AnyElement<'static>> {
    const BANNER: &[(&str, Color)] = &[
        (" █████ █████     █████    █████ █████ ", Color::Red),
        ("░░███ ░░███    ███░░░███ ░░███ ░░███  ", Color::Red),
        (" ░███  ░███ █ ███   ░░███ ░███  ░███ █", Color::Red),
        (" ░███████████░███    ░███ ░███████████", Color::Red),
        (" ░░░░░░░███░█░███    ░███ ░░░░░░░███░█", Color::Red),
        ("       ░███░ ░░███   ███        ░███░ ", Color::Red),
        ("       █████  ░░░█████░         █████ ", Color::Red),
        ("      ░░░░░     ░░░░░░         ░░░░░  ", Color::Red),
    ];

    element! {
        View(margin: 1, flex_direction: FlexDirection::Column) {
            #(BANNER.iter().map(|&(line, color)| element! {
                View(justify_content: JustifyContent::Center) { Text(content: line, color: color) }
            }))
        }
    }
}

pub fn page() -> AnyElement<'static> {
    element! {
        View(flex_direction: FlexDirection::Column) {
            BrowserHelp() {}

            View(
                width: 90,
                flex_direction: FlexDirection::Column,
                align_items: AlignItems::Stretch,
                border_style: BorderStyle::Round,
                border_color: Color::DarkGrey,
            ) {
                Banner()

                View(padding_left: 1, padding_right: 1) {
                    TextBlock(title: "Message", content: "The page you're looking for doesn't exist :(") {}
                }

                View(margin: 1, margin_left: 3, flex_direction: FlexDirection::Column, row_gap: 1) {
                    Text(content: "Legend", color: Color::Yellow, weight: Weight::Bold)

                    View() {
                        MixedText(contents: vec![
                            MixedTextContent::new("$ curl").color(Color::Cyan),
                            MixedTextContent::new(" -L sh.dallinhuff.com     "),
                            MixedTextContent::new("Go back to home page").color(Color::Magenta).italic(),
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
        let max_width = 90;

        let output = get_rendered_output(false);

        assert!(output.lines().all(|l| l.chars().count() <= max_width));
    }
}
