export type Submission = {
  id: string;
  course: string;
  assignment: string;
  student: string;
  submittedAt: string;
};

export const gradingQueue: Submission[] = [
  { id: "s1", course: "Algorithms", assignment: "Lab 3", student: "A. Patel", submittedAt: "Nov 6, 10:12" },
  { id: "s2", course: "Human-AI Ethics", assignment: "Essay Outline", student: "J. Kim", submittedAt: "Nov 6, 09:48" },
  { id: "s3", course: "Data Structures", assignment: "Project Milestone", student: "R. Singh", submittedAt: "Nov 6, 09:20" },
  { id: "s4", course: "Operating Systems", assignment: "Scheduler Report", student: "M. Garcia", submittedAt: "Nov 5, 18:32" },
  { id: "s5", course: "Databases", assignment: "SQL Practice 2", student: "L. Chen", submittedAt: "Nov 5, 17:04" },
  { id: "s6", course: "Machine Learning", assignment: "Regression Notebook", student: "P. Johnson", submittedAt: "Nov 5, 16:41" },
  { id: "s7", course: "Algorithms", assignment: "Quiz 2", student: "E. Nguyen", submittedAt: "Nov 5, 15:12" },
  { id: "s8", course: "Human-AI Ethics", assignment: "Case Study", student: "S. Thomas", submittedAt: "Nov 5, 14:27" },
  { id: "s9", course: "Data Structures", assignment: "Lab 4", student: "K. Brown", submittedAt: "Nov 5, 13:53" },
  { id: "s10", course: "Operating Systems", assignment: "Kernel Diary", student: "H. Ali", submittedAt: "Nov 5, 12:18" },
];


