use std::{
    fs::File,
    io::{BufWriter, Write},
    path::{Path, PathBuf},
};

use clap::{Parser, Subcommand};
use iocraft::{AnyElement, ElementExt};

use crate::routes;

/// dh-sh: A CLI tool for generating curl-able ANSI pages for my personal website.
#[derive(Parser)]
#[command(version, about)]
struct Args {
    #[command(subcommand)]
    command: Command,
}

#[derive(Debug, Clone, Subcommand)]
enum Command {
    /// Generate the entire site as a static directory of ascii files.
    #[command(alias = "gen")]
    Generate(GenerateArgs),

    /// Render a single page to stdout
    Render(RenderArgs),
}

#[derive(Debug, Clone, Parser)]
struct GenerateArgs {
    /// The directory to generate output to
    #[arg(short, long, default_value = "./out")]
    dir: Option<PathBuf>,

    /// Strip ANSI escape sequences and output only plain text
    #[arg(short, long, action, default_value = "false")]
    plain: bool,
}

#[derive(Debug, Clone, Parser)]
struct RenderArgs {
    /// The route/page to render
    #[command(subcommand)]
    route: Route,

    /// Strip ANSI escape sequences and output only plain text
    #[arg(short, long, action, default_value = "false")]
    plain: bool,
}

#[derive(Debug, Clone, Copy, Subcommand)]
enum Route {
    Home,
}

pub fn run() -> std::io::Result<()> {
    let args = Args::parse();

    match args.command {
        Command::Generate(args) => generate(args),
        Command::Render(args) => render(args, std::io::stdout()),
    }
}

fn generate(args: GenerateArgs) -> std::io::Result<()> {
    let dir = args.dir.unwrap_or_else(|| PathBuf::from("./out"));
    std::fs::create_dir_all(&dir)?;

    const ROUTES: &[Route] = &[Route::Home];

    for route in ROUTES {
        let file_name = match route {
            Route::Home => dir.join(Path::new("index")),
        };
        let buf = BufWriter::new(File::create(file_name)?);
        render(
            RenderArgs {
                route: *route,
                plain: args.plain,
            },
            buf,
        )?;
    }

    let mut w = BufWriter::new(File::create(dir.join(Path::new("_headers")))?);
    write!(w, "/*\n  Content-Type: text/plain\n")?;

    Ok(())
}

fn render<W: Write>(args: RenderArgs, writer: W) -> std::io::Result<()> {
    let mut page: AnyElement<'_> = match args.route {
        Route::Home => routes::home::page(),
    };

    if args.plain {
        page.render(None).write(writer)?;
    } else {
        page.render(None).write_ansi(writer)?;
    }

    Ok(())
}
