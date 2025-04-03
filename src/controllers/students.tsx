import React, { useState } from "react";
import { supabase } from '../utils/supabase'


interface iStudent {
    id: number;
    name: string;
    password: string;
    email: string;
    createdAt: string;
}

const [student, setStudents] = useState<iStudent[]>([]);

async function setStudent() {
  const { data, error } = await supabase
    .from("students")
    .insert([{ some_column: "someValue", other_column: "otherValue" }])
    .select();
}

async function Delete() {}

async function Update() {}

async function Select() {}
