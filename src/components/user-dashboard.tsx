import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface UserDashboardProps {
  username: string;
}

interface ICPFormData {
  [key: string]: string;
}

export function UserDashboard({ username }: UserDashboardProps) {
  const [formData, setFormData] = useState<ICPFormData>({});

  useEffect(() => {
    const storedData = localStorage.getItem(`icpFormData_${username}`);
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, [username]);

  return (
    <Card className="w-full mx-auto mt-10 mb-10">
      <CardHeader>
        <CardTitle>How To use</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                Understand the Question and its Underlined main Element.
              </TableHead>
              <TableHead>
                Click on (?click to know more ) Button to know more About it.
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(formData).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell className="font-medium">{key}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
