import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, FileText } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <Shield className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          لوحة تحكم المسؤول
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          مرحبًا بك في مركز التحكم. من هنا يمكنك إدارة جميع جوانب المنصة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>إدارة المستخدمين</CardTitle>
                <CardDescription>عرض وتعديل صلاحيات المستخدمين.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/users">الانتقال إلى إدارة المستخدمين</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-full">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                    <CardTitle>مراجعة المحتوى</CardTitle>
                    <CardDescription>الموافقة على قصص النجاح والتعليقات.</CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">قريبًا...</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-muted rounded-full">
                         <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                        <CardTitle>إحصائيات الموقع</CardTitle>
                        <CardDescription>عرض تقارير الأداء والتفاعل.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">قريبًا...</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
