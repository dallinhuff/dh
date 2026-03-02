use clap::{Parser, Subcommand};
use iocraft::{AnyElement, ElementExt};

use crate::routes;

/// dh-sh: A CLI tool for generating curl-able ANSI pages for my personal website.
#[derive(Parser)]
#[command(version, about)]
pub struct Args {
    /// Strip ANSI escape sequences and output only plain text
    #[arg(short, long, action, default_value = "false")]
    plain: bool,

    /// The page/route to render
    #[command(subcommand)]
    route: Route,
}

#[derive(Debug, Clone, Copy, Subcommand)]
enum Route {
    Home,
}

pub fn run() -> std::io::Result<()> {
    let args = Args::parse();

    let mut page: AnyElement<'_> = match args.route {
        Route::Home => routes::home::page(),
    };

    if args.plain {
        page.render(None).write(std::io::stdout())?;
    } else {
        page.render(None).write_ansi(std::io::stdout())?;
    }

    Ok(())
}
