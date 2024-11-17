"use server";

export interface StaticContent {
  id: string;
  static_page_type: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export type StaticPagesTypes =
  | "ABOUT_US"
  | "TERMS_AND_CONDITIONS"
  | "PRIVACY_POLICY"
  | "RETURN_POLICY";
