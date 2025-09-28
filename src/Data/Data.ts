import type { VideoHomework, Word } from "../Model";
import { supabase } from "../supabaseClient";

export const HOMEWORK_DATE = "2025-08-28";
export const DUE_DATE = "2025-08-30";

export const targetWords: Word[] = [
  { theme: "vegetable", text: "cabbage", image_url: "../images/cabbage.png" },
  { theme: "vegetable", text: "carrot", image_url: "../images/carrot.png" },
  { theme: "vegetable", text: "corn", image_url: "../images/corn.png" },
  { theme: "vegetable", text: "lettuce", image_url: "../images/lettuce.png" },
  { theme: "vegetable", text: "onion", image_url: "../images/onion.png" },
  { theme: "vegetable", text: "potato", image_url: "../images/potato.png" },
  { theme: "vegetable", text: "pumpkin", image_url: "../images/pumpkin.png" },
  { theme: "vegetable", text: "radish", image_url: "../images/radish.png" },
];

const getEmbedUrl = (url: string) => {
  const match = url.match(/v=([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

export async function fetchHomework(
  studentId: string
): Promise<VideoHomework[]> {
  const { data, error } = await supabase
    .from("student_homework")
    .select(
      `
        id,
        completed,
        teacher_comment,
        due_date,
        homework (
          id,
          title,
          video_url
        )
      `
    )
    .eq("student_id", studentId)
    .order("assigned_at", { ascending: false });

  //console.log("Homework rows:", data, "Error:", error);

  if (error) {
    console.error("Supabase fetch error:", error);
    return [];
  }

  // Map database rows to your existing VideoHomework interface
  return (data as any[]).map((item) => ({
    assignmentId: item.id as string,
    id: item.homework.id as string,
    title: item.homework.title as string,
    url: getEmbedUrl(item.homework.video_url as string),
    isWatched: item.completed as boolean,
    assignedDate: item.assigned_at as string,
    dueDate: item.due_date as string,
    teacherComment: item.teacher_comment ?? undefined,
  }));
}
/*
export const homework: VideoHomework[] = [
  {
    id: uuidv4(),
    title: "Fruit names",
    url: "https://www.youtube.com/embed/eBVqcTEC3zQ?si=sxI7BLVOdl9yYXa5",
    isWatched: false,
    dueDate: DUE_DATE,
  },
  {
    id: uuidv4(),
    title: "Homework name",
    url: "https://www.youtube.com/embed/W9rX6ApYqjo?si=yUudL6YR4yxqAyjc",
    isWatched: false,
    dueDate: DUE_DATE,
  },
  {
    id: uuidv4(),
    title: "Very very very very very long title",
    url: "https://www.youtube.com/embed/-GSnmRZlgc4?si=xgfzXlo-ah8qAstS",
    isWatched: false,
    dueDate: DUE_DATE,
  },
  {
    id: uuidv4(),
    title: "Story book",
    url: "https://www.youtube.com/embed/WFQIrd97t-Y?si=bIxyh0CRNYSkCVrt",
    isWatched: false,
    dueDate: DUE_DATE,
  },
];
*/
