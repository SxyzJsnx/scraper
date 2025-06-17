import axios from "axios";
import * as cheerio from "cheerio";

export default async function mfdl(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const downloadElement = $("#downloadButton");

    const downloadUrl = downloadElement.attr("href");
    const fileName = $(".dl-btn-label").text().trim();
    const fileSize = downloadElement.text().trim();

    if (!downloadUrl) throw new Error("Gagal menemukan link download.");

    return {
      fileName,
      fileSize,
      downloadUrl,
    };
  } catch (e) {
    return Promise.reject(e);
  }
}
