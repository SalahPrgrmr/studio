import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, FileText, Settings, BarChart } from "lucide-react";
import Link from "next/link";


export default async function AdminDashboardPage() {
  
  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          لوحة تحكم المسؤول
        </h1>
        <p className="text-muted-foreground">
          مرحبًا بك في مركز التحكم. من هنا يمكنك إدارة جميع جوانب المنصة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
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
        <Card className="shadow-sm opacity-50 cursor-not-allowed">
          <CardHeader>
            <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-lg">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                    <CardTitle>مراجعة المحتوى</CardTitle>
                    <CardDescription>الموافقة على قصص النجاح والتعليقات.</CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">هذه الميزة قيد التطوير حاليًا.</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm opacity-50 cursor-not-allowed">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-muted rounded-lg">
                         <BarChart className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                        <CardTitle>إحصائيات الموقع</CardTitle>
                        <CardDescription>عرض تقارير الأداء والتفاعل.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">هذه الميزة قيد التطوير حاليًا.</p>
            </CardContent>
        </Card>
         <Card className="shadow-sm opacity-50 cursor-not-allowed">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-muted rounded-lg">
                         <Settings className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                        <CardTitle>إعدادات المنصة</CardTitle>
                        <CardDescription>التحكم في إعدادات الموقع العامة.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">هذه الميزة قيد التطوير حاليًا.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
