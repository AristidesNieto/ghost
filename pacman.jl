using agents

@agent struct Ghost(GridAgent{2})
    type :: String = "Ghost"
end

function agent_step!(_agent, _model)

end

function initialize_model()
    space = GridSpace((5,5); periodic = false, metric = :manhattan)
    model = StandardABM(Ghost, space; agent_step!)
    return model
end

model = initialize_model()
a = add_agent!(Ghost, pos=(3,3), model)