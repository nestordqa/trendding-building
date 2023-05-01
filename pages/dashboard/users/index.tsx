import React from 'react'
import { DashboardLayout } from '@components/components/dashboard'
import {Users} from '@components/components/dashboard/users/Users'

const UpdateUser = () => {
    return (
        <DashboardLayout title="Usuarios">
            <Users/>
        </DashboardLayout>
    )
}

export default UpdateUser;