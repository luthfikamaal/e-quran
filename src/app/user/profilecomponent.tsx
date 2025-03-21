"use client";

import { localStorageUtils } from "@/lib/localStorageUtils";
import { User } from "@/types/user";

export default function ProfileComponent() {
  let user = localStorageUtils.get("user") as User;

  return (
    <>
      <div className="px-5">
        <h1 className="text-3xl font-bold">Profile</h1>
      </div>
    </>
  );
}
