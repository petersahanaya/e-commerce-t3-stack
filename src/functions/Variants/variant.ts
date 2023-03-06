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

export const CardVariant = {
    hidden : {
        opacity: 0,
        scale : .7
    },
    visible : {
        opacity : 1,
        scale : 1,
        transition : {
            type : "spring",
            damping : 20,
            stiffness : 300
        }
    },
    exit : {
        opacity : 0,
        scale : 0,
        height : 0,
        transition : {
            ease : "easeOut"
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
