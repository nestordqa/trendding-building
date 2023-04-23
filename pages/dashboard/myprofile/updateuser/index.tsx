import React from 'react'
import { DashboardLayout } from '@components/components/dashboard'
import UserUpdate from '@components/components/dashboard/dashboardUser/UpdateUser'

const UpdateUser = () => {
    return (
        <DashboardLayout title="Actualizar mis datos">
            <UserUpdate/>
        </DashboardLayout>
    )
}

export default UpdateUser;
