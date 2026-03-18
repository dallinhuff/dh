import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { type CheerioAPI, load } from "cheerio";
import { beforeAll, describe, expect, it } from "vitest";
import CO2Badge from "./CO2Badge.astro";

describe("CO2Badge", () => {
  let $: CheerioAPI;

  beforeAll(async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(CO2Badge);

    $ = load(html);
  });

  it("correctly fetches and displays the grade", () => {
    const grade = $("[data-grade]").attr("data-grade");

    expect(grade).toBeOneOf([
      "A+",
      "A",
      "A-",
      "B+",
      "B",
      "B-",
      "C+",
      "C",
      "C-",
      "D+",
      "D",
      "D-",
      "F",
    ]);
  });

  it("correctly fetches and displays emissions per page view", () => {
    const emissionsPerView = Number.parseFloat(
      $("[data-amount]").attr("data-amount") ?? "",
    );

    expect(emissionsPerView).not.toBeNaN();
    expect(emissionsPerView).toBeGreaterThan(0);
  });

  it("correctly fetches and displays percentile", () => {
    const percentile = Number.parseInt(
      $("[data-percentile]").attr("data-percentile") ?? "",
      10,
    );

    expect(percentile).not.toBeNaN();
    expect(percentile).toBeGreaterThan(0);
    expect(percentile).toBeLessThan(100);
  });

  it("correctly fetches and displays check date", () => {
    const dateString = $("time").attr("datetime") ?? "";

    // TODO: replace with Temporal API when supported by node
    const date = new Date(Date.parse(dateString));

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(new Date().getDate() - 2);
    expect(date.valueOf()).toBeGreaterThan(twoDaysAgo.valueOf());
  });
});
