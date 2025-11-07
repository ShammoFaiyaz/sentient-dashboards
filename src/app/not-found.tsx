"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { useRole } from "@/components/role/RoleProvider";

export default function NotFound() {
  const { role } = useRole();
  const homeHref = role ? `/${role}` : "/";

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center p-6">
      <Card className="w-full text-center">
        <CardTitle>404 - Page not found</CardTitle>
        <p className="mt-2 text-sm text-neutral-dark/80">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <div className="mt-4 flex items-center justify-center">
          <Link href={homeHref}>
            <Button>Back to dashboard</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}


