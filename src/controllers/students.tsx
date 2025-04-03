import React, { useState } from "react";
import { supabase } from "../utils/supabase";

interface iStudent {
  id: number;
  name: string;
  password: string;
  email: string;
  createdAt: string;
}

const [student, setStudents] = useState<iStudent[]>([]);

async function setStudent(student: iStudent) {
  const { data, error } = await supabase
    .from("students")
    .insert([student])
    .select();
}

async function delStudent(id:number) {
  const { error } = await supabase
    .from("students")
    .delete()
    .eq("id", `${id}`);
}

async function editStudent(student:iStudent) {
  const { data, error } = await supabase
    .from("students")
    .update(student)
    .eq("id", `${student.id}`)
    .select();
}

async function getStudent() {
  let { data: students, error } = await supabase.from("students").select("*");
  return students
}

async function selectStudent() {
  let { data: students, error } = await supabase
    .from("students")
    .select("*")

    // Filters
    .eq("column", "Equal to")
    .gt("column", "Greater than")
    .lt("column", "Less than")
    .gte("column", "Greater than or equal to")
    .lte("column", "Less than or equal to")
    .like("column", "%CaseSensitive%")
    .ilike("column", "%CaseInsensitive%")
    .is("column", null)
    .in("column", ["Array", "Values"])
    .neq("column", "Not equal to")

    // Arrays
    .contains("array_column", ["array", "contains"])
    .containedBy("array_column", ["contained", "by"])

    // Logical operators
    .not("column", "like", "Negate filter")
    .or("some_column.eq.Some value, other_column.eq.Other value");
}
