import { Chapter } from "@/interfaces";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { readFile, readFileSync } from "fs";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // read vtt file from /tmp/${params.id}.vtt
  const vtt = await readFileSync(`/tmp/${params.id}.vtt`, {
    encoding: "utf8",
    flag: "r",
  });

  return new Response(vtt, {
    status: 200,
    headers: {
      "Content-Type": "text/vtt",
    },
  });
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { chapters } = await request.json();

  try {
    const webvtt = convertToWebVTT(chapters);
    // write webvtt to file
    const filePath = `/tmp/${params.id}.vtt`;
    await writeFile(filePath, webvtt);
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json({
    message: `WebVTT written to /tmp/${params.id}.vtt`,
  });
}

function convertToWebVTT(chapters: Chapter[]): string {
  // Utility to convert seconds to hh:mm:ss format
  function formatTime(seconds: number): string {
    if (typeof seconds !== "number" || isNaN(seconds)) {
      return "00:00:00";
    }

    let hours: number | string = Math.floor(seconds / 3600);
    let minutes: number | string = Math.floor((seconds % 3600) / 60);
    let secs: number | string = Math.floor(seconds % 60);

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (secs < 10) secs = "0" + secs;

    return `${hours}:${minutes}:${secs}`;
  }

  // Create the WEBVTT header
  let result: string[] = ["WEBVTT"];

  // Sort chapters by start_time
  const sortedChapters = chapters.sort((a, b) => {
    const aStartTime = a.start_time !== undefined ? a.start_time : 0;
    const bStartTime = b.start_time !== undefined ? b.start_time : 0;
    return aStartTime - bStartTime;
  });

  // Convert each chapter into the appropriate format
  for (const chapter of sortedChapters) {
    // If start_time is missing, set it to 0
    const startTime = chapter.start_time !== undefined ? chapter.start_time : 0;

    if (typeof startTime === "number" && typeof chapter.end_time === "number") {
      const formattedStartTime = formatTime(startTime);
      const formattedEndTime = formatTime(chapter.end_time);
      result.push(
        `\n${formattedStartTime} --> ${formattedEndTime}\n${chapter.title}`
      );
    }
  }

  return result.join("\n");
}
