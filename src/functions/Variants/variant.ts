export const RouteVariant = {
    hidden : {
        opacity : 0,
    },
    visible : {
        opacity : 1,
        transition : {
            duration : .4
        }
    }
}

export const SideBarVariant = {
    hidden : {
        opacity : 0,
        x : 200
    },
    visible : {
        opacity : 1,
        x : 0,
        transition : {
            type : "spring",
            damping : 30,
            stiffness : 300
        }
    }
}

export const PopUpVariant = {
    hidden : {
        opacity : 0,
        y : -200
    },
    visible : {
        opacity : 1,
        y : 0,
        transition : {
            type : "spring",
            damping : 30,
            stiffness : 300
        }
    }
}
