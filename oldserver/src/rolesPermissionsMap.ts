import Roles from "./models/v1/roles.model";
import Permissions from "./models/v1/permissions.model";
import RolesPermissions from "./models/v1/rolesPermissions.model";

export class RolesPermissionsMap {
    private static _instance: RolesPermissionsMap;
    private static _roles: Roles[] = [];
    private static _permissions: Permissions[] = [];
    private static _rolesPermissions: RolesPermissions[] = [];
    private static _rolePermissionsMap: any = {};

    constructor() {
        if (RolesPermissionsMap._instance == null) {
            this.initialize();
            RolesPermissionsMap._instance = this;
        }
        return RolesPermissionsMap._instance;
    }

    public static getInstance = (): RolesPermissionsMap => {
        if(RolesPermissionsMap._instance != null) {
          return RolesPermissionsMap._instance;
        }
        return new RolesPermissionsMap();
      }

    private initialize = async () => {
        await RolesPermissionsMap.getRoles();
        await RolesPermissionsMap.getPermissions();
        await RolesPermissionsMap.getRolesPermissions();
        RolesPermissionsMap.createRolesPermissionsMap();
        RolesPermissionsMap.fillRolesPermissionsMap();
        RolesPermissionsMap.stringifyPermissions();
    }
    
    private static getRoles = async () => {
        RolesPermissionsMap._roles = await Roles.findAll();
    }

    private static getPermissions = async () => {
        RolesPermissionsMap._permissions = await Permissions.findAll();
    }

    private static getRolesPermissions = async () => {
        RolesPermissionsMap._rolesPermissions = await RolesPermissions.findAll();
    }

    private static createRolesPermissionsMap = () => {
        RolesPermissionsMap._roles.map((role: Roles): void => {
            RolesPermissionsMap._rolePermissionsMap[role.id] = { name: role.name, permissions: [] }
        });
    }

    private static fillRolesPermissionsMap = () => {
        RolesPermissionsMap._rolesPermissions.map((rolePermission: RolesPermissions): void => {
            RolesPermissionsMap._rolePermissionsMap[rolePermission.role_id].permissions.push(rolePermission.permission_id);
        });
    }

    private static stringifyPermissions = (): void => {
        for (let key in RolesPermissionsMap._rolePermissionsMap) {
            if (RolesPermissionsMap._rolePermissionsMap.hasOwnProperty(key)) {
                RolesPermissionsMap._rolePermissionsMap[key].permissions.map((permissionId: number, index: number): void => {
                    RolesPermissionsMap._permissions.map((permission: Permissions): void => {
                        if (permissionId === permission.id) {
                            RolesPermissionsMap._rolePermissionsMap[key].permissions[index] = permission.name;
                        }
                    })
                })
            }
        }
    }

    public static validatePermission = (roleId: number, permission: string) => {
        return RolesPermissionsMap._rolePermissionsMap[roleId].permissions.indexOf(permission) !== -1;
    }
}