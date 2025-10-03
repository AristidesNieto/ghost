using Agents

@agent struct Ghost(GridAgent{2})
    type :: String = "Ghost"
end

@agent struct PacMan(GridAgent{2})
    type :: String = "PacMan"
end

matrix = [
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;
    0 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 0;
    0 1 0 1 0 0 0 1 1 1 0 1 0 1 0 1 0;
    0 1 1 1 0 1 0 0 0 0 0 1 0 1 1 1 0;
    0 1 0 0 0 1 1 1 1 1 1 1 0 0 0 1 0;
    0 1 0 1 0 1 0 0 0 0 0 1 1 1 0 1 0;
    0 1 1 1 0 1 0 1 1 1 0 1 0 1 0 1 0;
    0 1 0 1 0 1 0 1 1 1 0 1 0 1 0 1 0;
    0 1 0 1 1 1 0 0 1 0 0 1 0 1 1 1 0;
    0 1 0 0 0 1 1 1 1 1 1 1 0 0 0 1 0;
    0 1 1 1 0 1 0 0 0 0 0 1 0 1 1 1 0;
    0 1 0 1 0 1 0 1 1 1 0 0 0 1 0 1 0;
    0 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 0;
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
]

function agent_step!(agent, model)
    if agent isa Ghost
        pacman = first(filter(a -> a isa PacMan, allagents(model)))
        # Solo moverse si hay PacMan
        if !isnothing(pacman)
            move_along_route!(agent, pacman.pos, model; allow_occupied=false, allow_diagonal=false)
        end
    end
end

function initialize_model()
    space = GridSpace(size(matrix); periodic = false, metric = :manhattan)
    model = StandardABM(Union{Ghost, PacMan}, space; agent_step!)
    add_agent!(Ghost, pos=(3,3), model)
    add_agent!(PacMan, pos=(10,10), model)
    return model
end

model = initialize_model()
