export type UserRole = 'Admin' | 'Instructor' | 'Student';
export type UserStatus = 'Active' | 'Inactive' | 'Suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar: string;
  joinedDate: string;
  lastLogin: string;
  enrolledCourses: number;
}

export const mockUsers: User[] = [
  {
    id: 'USR-1001',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?img=1',
    joinedDate: '2023-01-15',
    lastLogin: '2023-10-24T10:30:00Z',
    enrolledCourses: 0,
  },
  {
    id: 'USR-1002',
    name: 'Michael Chen',
    email: 'm.chen@example.com',
    role: 'Instructor',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?img=11',
    joinedDate: '2023-02-20',
    lastLogin: '2023-10-23T14:15:00Z',
    enrolledCourses: 12,
  },
  {
    id: 'USR-1003',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    role: 'Student',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?img=5',
    joinedDate: '2023-05-10',
    lastLogin: '2023-10-20T09:45:00Z',
    enrolledCourses: 4,
  },
  {
    id: 'USR-1004',
    name: 'James Wilson',
    email: 'j.wilson@example.com',
    role: 'Student',
    status: 'Inactive',
    avatar: 'https://i.pravatar.cc/150?img=8',
    joinedDate: '2023-06-05',
    lastLogin: '2023-08-12T16:20:00Z',
    enrolledCourses: 1,
  },
  {
    id: 'USR-1005',
    name: 'Sophia Martinez',
    email: 's.martinez@example.com',
    role: 'Instructor',
    status: 'Suspended',
    avatar: 'https://i.pravatar.cc/150?img=9',
    joinedDate: '2023-03-12',
    lastLogin: '2023-09-01T11:10:00Z',
    enrolledCourses: 8,
  },
  {
    id: 'USR-1006',
    name: 'William Taylor',
    email: 'w.taylor@example.com',
    role: 'Student',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?img=12',
    joinedDate: '2023-07-22',
    lastLogin: '2023-10-24T08:05:00Z',
    enrolledCourses: 3,
  },
];
