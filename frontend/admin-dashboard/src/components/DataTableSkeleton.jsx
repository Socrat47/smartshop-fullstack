import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function DataTableSkeleton() {
    const items = Array.from({ length: 5 }, (v, i) => i);

    return (
        <div className="card mt-30">
            <DataTable value={items} className="p-datatable-striped">
                <Column field="code" header="Code" style={{ width: '25%' }} body={<Skeleton />}></Column>
                <Column field="name" header="Name" style={{ width: '25%' }} body={<Skeleton />}></Column>
                <Column field="category" header="Category" style={{ width: '25%' }} body={<Skeleton />}></Column>
                <Column field="quantity" header="Quantity" style={{ width: '25%' }} body={<Skeleton />}></Column>
            </DataTable>
        </div>
    );
}
