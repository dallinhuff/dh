import { experimental_AstroContainer as AstroContainer } from "astro/container";
import type { CollectionEntry } from "astro:content";
import { load, type CheerioAPI } from "cheerio";
import { beforeAll, expect, describe, it } from "vitest";

import Job from "./Job.astro";
import img from "../data/work/img/jj.png";

async function render(job: CollectionEntry<"professional">["data"]) {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Job, {
    props: {
      data: job,
    },
  });

  return load(html);
}

describe("a job with a date range", () => {
  const job: CollectionEntry<"professional">["data"] = {
    organization: "Acme, Inc.",
    role: "Widget Assembler",
    start: "Jun 1901",
    end: "Jul 1902",
    image: img,
    description: "I assembled widgets for 13 months.",
  };

  let $: CheerioAPI;

  beforeAll(async () => {
    $ = await render(job);
  });

  it("includes the organization", () => {
    expect($("header h3").text()).toContain(job.organization);
  });

  it("includes the role", () => {
    expect($("header").text()).toContain(job.role);
  });

  it("includes the date range", () => {
    expect($("header").text()).toContain(`${job.start} \u2013 ${job.end}`);
  });

  it("includes the description", () => {
    expect($("section").text()).toContain(job.description);
  });
});

describe("a job with no end date", () => {
  const job: CollectionEntry<"professional">["data"] = {
    organization: "Acme, Inc.",
    role: "Widget Assembler",
    start: "Jun 1901",
    image: img,
    description: "I have assembled widgets for over 100 years.",
  };

  let $: CheerioAPI;

  beforeAll(async () => {
    $ = await render(job);
  });

  it("includes the organization", () => {
    expect($("header h3").text()).toContain(job.organization);
  });

  it("includes the role", () => {
    expect($("header").text()).toContain(job.role);
  });

  it("includes the date range", () => {
    expect($("header").text()).toContain(`${job.start} \u2013 Present`);
  });

  it("includes the description", () => {
    expect($("section").text()).toContain(job.description);
  });
});

describe("a job with the same start/end date", () => {
  const job: CollectionEntry<"professional">["data"] = {
    organization: "Acme, Inc.",
    role: "Widget Assembler",
    start: "Jun 1901",
    end: "Jun 1901",
    image: img,
    description: "I earned my widget assembling certificate.",
  };

  let $: CheerioAPI;

  beforeAll(async () => {
    $ = await render(job);
  });

  it("includes the organization", () => {
    expect($("header h3").text()).toContain(job.organization);
  });

  it("includes the role", () => {
    expect($("header").text()).toContain(job.role);
  });

  it("includes the date (but not a range)", () => {
    expect($("header").text()).toContain(job.start);
    expect($("header").text()).not.toContain("\u2013");
  });

  it("includes the description", () => {
    expect($("section").text()).toContain(job.description);
  });
});
