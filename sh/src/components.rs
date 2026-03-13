use iocraft::prelude::*;

#[component]
pub fn Banner() -> impl Into<AnyElement<'static>> {
    const BANNER: &[(&str, Color)] = &[
        ("██████╗ ██╗  ██╗", Color::Yellow),
        ("██╔══██╗██║  ██║", Color::Green),
        ("██║  ██║███████║", Color::Cyan),
        ("██║  ██║██╔══██║", Color::Magenta),
        ("██████╔╝██║  ██║", Color::Red),
        ("╚═════╝ ╚═╝  ╚═╝", Color::Yellow),
    ];

    element! {
        View(margin: 1, flex_direction: FlexDirection::Column) {
            #(BANNER.iter().map(|&(line, color)| element! {
                View(justify_content: JustifyContent::Center) { Text(content: line, color: color) }
            }))
        }
    }
}

#[component]
pub fn BigBanner() -> impl Into<AnyElement<'static>> {
    const BANNER: &str = "\
        ██████╗  █████╗ ██╗     ██╗     ██╗███╗   ██╗    ██╗  ██╗██╗   ██╗███████╗███████╗\n\
        ██╔══██╗██╔══██╗██║     ██║     ██║████╗  ██║    ██║  ██║██║   ██║██╔════╝██╔════╝\n\
        ██║  ██║███████║██║     ██║     ██║██╔██╗ ██║    ███████║██║   ██║█████╗  █████╗  \n\
        ██║  ██║██╔══██║██║     ██║     ██║██║╚██╗██║    ██╔══██║██║   ██║██╔══╝  ██╔══╝  \n\
        ██████╔╝██║  ██║███████╗███████╗██║██║ ╚████║    ██║  ██║╚██████╔╝██║     ██║     \n\
        ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝    ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝     ";

    const COLORS: &[Color] = &[
        Color::Yellow,
        Color::Green,
        Color::Cyan,
        Color::Magenta,
        Color::Red,
        Color::Yellow,
    ];

    element! {
        View(margin: 1, flex_direction: FlexDirection::Column) {
            #(BANNER.lines().zip(COLORS).map(|(line, color)| element! {
                View(justify_content: JustifyContent::Center) { Text(content: *line, color: *color) }
            }))
        }
    }
}

#[derive(Default, Props)]
pub struct TextBlockProps<'a> {
    pub title: &'a str,
    pub content: &'a str,
    pub basis: FlexBasis,
}

#[component]
pub fn TextBlock<'a>(props: &TextBlockProps<'a>) -> impl Into<AnyElement<'static>> {
    element! {
        View(
            flex_grow: true,
            flex_basis: props.basis,
            flex_direction: FlexDirection::Column,
            border_style: BorderStyle::Round,
            border_color: Color::DarkGrey,
        ) {
            View(margin_top: -1, margin_left: 1, margin_right: 1) {
                Text(
                    color: Color::Yellow,
                    weight: Weight::Bold,
                    content: props.title,
                )
            }
            View(margin: 1) {
                Text(content: props.content)
            }
        }
    }
}

#[derive(Default, Props)]
pub struct DictBlockProps<'a> {
    pub title: &'a str,
    pub basis: FlexBasis,
    pub entries: Vec<(&'a str, &'a str)>,
}

const ROUNDED_RIGHT: BorderCharacters = BorderCharacters {
    top_left: '┬',
    top_right: '╮',
    left: '│',
    right: '│',
    bottom: '─',
    bottom_left: '┴',
    bottom_right: '╯',
    top: '─',
};

#[component]
pub fn DictBlock<'a>(props: &DictBlockProps<'a>) -> impl Into<AnyElement<'static>> {
    element! {
        View(
            flex_grow: true,
            flex_basis: props.basis,
        ) {
            View(
                flex_direction: FlexDirection::Column,
                flex_basis: FlexBasis::Percent(25.0),
                border_color: Color::DarkGrey,
                border_style: BorderStyle::Round,
                border_edges: Some(Edges::Left | Edges::Top | Edges::Bottom),
            ) {
                View(margin_top: -1, margin_left: 1, margin_right: 1) {
                    Text(content: props.title, wrap: TextWrap::NoWrap, color: Color::Yellow, weight: Weight::Bold) {}
                }
                View(margin: 1, justify_content: JustifyContent::End) {
                    Text(content: props.entries.iter().map(|e| e.0).collect::<Vec<_>>().join("\n"), weight: Weight::Bold) {}
                }
            }
            View(flex_grow: true, border_style: BorderStyle::Custom(ROUNDED_RIGHT), border_color: Color::DarkGrey) {
                View(margin: 1) {
                    Text(content: props.entries.iter().map(|e| e.1).collect::<Vec<_>>().join("\n"), color: Color::Cyan)
                }
            }
        }
    }
}

#[component]
pub fn BrowserHelp() -> impl Into<AnyElement<'static>> {
    element! {
        View() {
            Text(content: "\x1b[8m    Does this page look weird in your browser? Try curl-ing it instead.    \x1b[0m")
        }
    }
}
