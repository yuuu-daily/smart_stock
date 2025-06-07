// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
// import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {Head, Link, router} from '@inertiajs/react';
import {Navigation} from "../components/molecules/Navigation";
import ImportPage from "../Pages/Stock/ImportPage/ImportPage";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <>
        </>
    );
}
