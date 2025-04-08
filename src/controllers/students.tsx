import React, { useState } from "react";
import { supabase } from "../utils/supabase";
import { Alert } from "react-native";

interface iStudent {
  name: string;
  birthday: string;
  email: string;
  phone: string;
  rg: string;
  cpf: string;
  cep: string;
  address: string;
  city: string;
  state: string;
  password: string;
  user_id: number;
}

type eStudent = { id: number } & iStudent;

async function setStudent(student: iStudent) {
  const { data, error } = await supabase
    .from("students")
    .insert([student])
    .select();
  if (error) {
    console.error("Error inserting student:", error);
  }
}

async function delStudent(id: number) {
  const { error } = await supabase.from("students").delete().eq("id", `${id}`);

  if (error) {
    console.log(error);
    alert(error);

    return false;
  } else return true;
}

async function editStudent(student: eStudent) {
  let studentID = student.id;
  const { id, ...studentValues } = student;

  const { data, error } = await supabase
    .from("students")
    .update(studentValues)
    .eq("id", `${studentID}`)
    .select();

  console.log(data);
}

async function getStudent() {
  let { data: students, error } = await supabase.from("students").select("*");

  return students;
}

async function selectStudent() {
  let { data: students, error } = await supabase.from("students").select("*");
}
export {
  selectStudent,
  delStudent,
  editStudent,
  getStudent,
  iStudent,
  eStudent,
  setStudent,
};
