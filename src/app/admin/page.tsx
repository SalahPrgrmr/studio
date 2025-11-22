import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Shield } from "lucide-react";

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
        <Card>
          <CardHeader>
            <CardTitle>إدارة المستخدمين</CardTitle>
             <CardDescription>عرض وتعديل صلاحيات المستخدمين.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">قريبًا...</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>مراجعة المحتوى</CardTitle>
             <CardDescription>الموافقة على قصص النجاح والتعليقات.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">قريبًا...</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>إحصائيات الموقع</CardTitle>
            <CardDescription>عرض تقارير الأداء والتفاعل.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">قريبًا...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
