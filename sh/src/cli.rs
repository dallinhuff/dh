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

    // Use `.html` extension for files so they work out of the box with
    // static file servers and CDNs like Cloudflare.
    const ROUTES: &[(Route, &str)] = &[(Route::Home, "index.html")];

    // Since we're using the html file extension even though these aren't
    // html documents, we need to make sure these are served as text/plain.
    // Cloudflare reads the _headers file.
    let mut w = BufWriter::new(File::create(dir.join(Path::new("_headers")))?);
    write!(w, "/*\n  Content-Type: text/plain\n")?;

    for (route, file_name) in ROUTES {
        render(
            RenderArgs {
                route: *route,
                plain: args.plain,
            },
            BufWriter::new(File::create(dir.join(Path::new(file_name)))?),
        )?;
    }

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
