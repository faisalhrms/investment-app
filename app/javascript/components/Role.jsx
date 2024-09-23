import React, { useState, useEffect } from 'react';
import axios from 'axios';

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;

const Role = () => {
    const [roles, setRoles] = useState([]);
    const [menus, setMenus] = useState([]);
    const [currentRole, setCurrentRole] = useState({ permissions: {} });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        fetchRoles();
        fetchMenus();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get('/roles.json');
            setRoles(response.data);
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    };

    const fetchMenus = async () => {
        try {
            const response = await axios.get('/menus.json');
            debugger

            setMenus(processMenus(response.data));
        } catch (error) {
            console.error("Error fetching menus:", error);
        }
    };

    const processMenus = (menus) => {
        const mainMenus = menus.filter(menu => menu.main_menu_id === null);
        const subMenus = menus.filter(menu => menu.main_menu_id !== null);

        return mainMenus.map(mainMenu => ({
            ...mainMenu,
            subMenus: subMenus.filter(subMenu => subMenu.main_menu_id === mainMenu.id)
        }));
    };

    const handleAddRole = () => {
        setCurrentRole({ name: '', is_active: true, permissions: {} });
        setIsEdit(false);
        setIsModalOpen(true);
    };

    const handleEditRole = async (roleId) => {
        try {
            const response = await axios.get(`/roles/${roleId}/edit.json`);
            const roleData = response.data.role;
            const permissions = {};

            if (roleData.permissions) {
                roleData.permissions.forEach(permission => {
                    permissions[permission.menu_id] = {
                        is_index: permission.is_index,
                        is_create: permission.is_create,
                        is_view: permission.is_view,
                        is_edit: permission.is_edit,
                        is_delete: permission.is_delete
                    };
                });
            }

            setCurrentRole({
                id: roleData.id,
                name: roleData.name,
                is_active: roleData.is_active,
                permissions: permissions,
            });

            setIsEdit(true);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching role details:", error);
        }
    };

    const handleDeleteRole = async (roleId) => {
        try {
            await axios.post('/delete_role', { role_id: roleId });
            fetchRoles();
        } catch (error) {
            console.error("Error deleting role:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = isEdit ? 'put' : 'post';
            const url = isEdit ? `/update_role` : '/new_role';

            await axios({
                method,
                url,
                data: { role: currentRole }
            });

            setIsModalOpen(false);
            fetchRoles();
        } catch (error) {
            console.error("Error submitting role:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentRole((prevRole) => ({
            ...prevRole,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handlePermissionChange = (menuId, permissionType, value) => {
        setCurrentRole(prevRole => ({
            ...prevRole,
            permissions: {
                ...prevRole.permissions,
                [menuId]: {
                    ...prevRole.permissions[menuId],
                    [permissionType]: value === 'on'
                }
            }
        }));
    };

    const renderMenuPermissions = (menu) => {
        const permission = currentRole.permissions[menu.id] || {
            is_index: false,
            is_create: false,
            is_view: false,
            is_edit: false,
            is_delete: false
        };

        return (
            <tr key={menu.id}>
                <td>{menu.name}</td>
                <td>
                    <select
                        required
                        className="form-control form-control-sm"
                        name="is_index"
                        value={permission.is_index ? 'on' : 'off'}
                        onChange={(e) => handlePermissionChange(menu.id, 'is_index', e.target.value)}
                    >
                        <option value="on">Yes</option>
                        <option value="off">No</option>
                    </select>
                </td>
                <td>
                    <select
                        required
                        className="form-control form-control-sm"
                        name="is_create"
                        value={permission.is_create ? 'on' : 'off'}
                        onChange={(e) => handlePermissionChange(menu.id, 'is_create', e.target.value)}
                    >
                        <option value="on">Yes</option>
                        <option value="off">No</option>
                    </select>
                </td>
                <td>
                    <select
                        required
                        className="form-control form-control-sm"
                        name="is_view"
                        value={permission.is_view ? 'on' : 'off'}
                        onChange={(e) => handlePermissionChange(menu.id, 'is_view', e.target.value)}
                    >
                        <option value="on">Yes</option>
                        <option value="off">No</option>
                    </select>
                </td>
                <td>
                    <select
                        required
                        className="form-control form-control-sm"
                        name="is_edit"
                        value={permission.is_edit ? 'on' : 'off'}
                        onChange={(e) => handlePermissionChange(menu.id, 'is_edit', e.target.value)}
                    >
                        <option value="on">Yes</option>
                        <option value="off">No</option>
                    </select>
                </td>
                <td>
                    <select
                        required
                        className="form-control form-control-sm"
                        name="is_delete"
                        value={permission.is_delete ? 'on' : 'off'}
                        onChange={(e) => handlePermissionChange(menu.id, 'is_delete', e.target.value)}
                    >
                        <option value="on">Yes</option>
                        <option value="off">No</option>
                    </select>
                </td>
            </tr>
        );
    };

    const renderSubMenus = (subMenus) => {
        return subMenus.map(subMenu => (
            <React.Fragment key={subMenu.id}>
                {renderMenuPermissions(subMenu)}
            </React.Fragment>
        ));
    };

    return (
        <div className="l-main" style={{ marginTop: '11rem', overflow: 'hidden', height: '100vh', width: '100vw' }}>
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={handleAddRole}>
                        <i className="ri-add-fill"></i> <span>Add Role</span>
                    </button>
                    <h4 className="card-title">Roles</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th scope="col">Sr #</th>
                                <th scope="col">Role Name</th>
                                <th scope="col">Assign Count</th>
                                <th scope="col">Is Active?</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {roles.map((role, index) => (
                                <tr key={role.id}>
                                    <td>{index + 1}</td>
                                    <td>{role.name}</td>
                                    <td>{role.users_count}</td>
                                    <td>
                                            <span className={`badge ${role.is_active ? 'badge-success' : 'badge-danger'}`}>
                                                {role.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                    </td>
                                    <td>
                                        <button className="btn btn-link" onClick={() => handleEditRole(role.id)}>
                                            <i className="ri-ball-pen-fill text-primary"></i>
                                        </button>
                                        <button className="btn btn-link" onClick={() => handleDeleteRole(role.id)}>
                                            <i className="ri-delete-bin-5-line text-danger"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{isEdit ? 'Edit Role' : 'Add Role'}</h5>
                                <button type="button" className="close" onClick={() => setIsModalOpen(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="RoleName">Role Name <span className="text-danger">*</span></label>
                                        <input
                                            required
                                            type="text"
                                            className="form-control"
                                            id="RoleName"
                                            name="name"
                                            value={currentRole.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter Role Name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-control custom-switch">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                name="is_active"
                                                id="Active"
                                                checked={currentRole.is_active}
                                                onChange={handleInputChange}
                                            />
                                            <label className="custom-control-label" htmlFor="Active">Active</label>
                                        </div>
                                    </div>

                                    {isEdit && (
                                        <React.Fragment>
                                            <h4 className="mt-4">Permissions</h4>
                                            <div className="accordion" id="accordionExample">
                                                {menus.map(menu => (
                                                    <div className="card" key={menu.id}>
                                                        <div className="card-header" id={`heading${menu.id}`}>
                                                            <h5 className="mb-0">
                                                                <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapse${menu.id}`} aria-expanded="true" aria-controls={`collapse${menu.id}`}>
                                                                    {menu.name.toUpperCase()}
                                                                </button>
                                                            </h5>
                                                        </div>

                                                        <div id={`collapse${menu.id}`} className="collapse" aria-labelledby={`heading${menu.id}`} data-parent="#accordionExample">
                                                            <div className="card-body">
                                                                <table className="table table-bordered">
                                                                    <thead>
                                                                    <tr>
                                                                        <th>Menu Name</th>
                                                                        <th>Is Index?</th>
                                                                        <th>Is Create?</th>
                                                                        <th>Is View?</th>
                                                                        <th>Is Edit?</th>
                                                                        <th>Is Delete?</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {renderMenuPermissions(menu)}
                                                                    {renderSubMenus(menu.subMenus)}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </React.Fragment>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Close</button>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Role;
