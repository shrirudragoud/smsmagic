import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ICPFormData {
  [key: string]: string;
}

export function AdminDashboard() {
  const [userDataList, setUserDataList] = useState<{ username: string; data: ICPFormData }[]>([]);

  useEffect(() => {
    const allUserData: { username: string; data: ICPFormData }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('icpFormData_')) {
        const username = key.replace('icpFormData_', '');
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        allUserData.push({ username, data });
      }
    }
    setUserDataList(allUserData);
  }, []);

  return (
    <Card className="w-full mx-auto mt-10">
      <CardHeader>
        <CardTitle>Admin Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        {userDataList.map(({ username, data }) => (
          <div key={username} className="mb-8">
            <h3 className="text-lg font-semibold mb-2">User: {username}</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(data).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="font-medium">{key}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}