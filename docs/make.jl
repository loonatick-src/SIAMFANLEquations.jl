using Documenter, SIAMFANLEquations, DocumenterTools
push!(LOAD_PATH,"../src/")
makedocs(sitename="SIAMFANLEquations.jl",
authors="C. T. Kelley",
format = Documenter.HTML(
               prettyurls = get(ENV, "CI", nothing) == "true"
           ),
pages = Any[
     "Home" => "index.md",
     "Solvers" => Any[
       "functions/nsol.md",
       "functions/ptcsol.md",
       "functions/nsoli.md",
       "functions/ptcsoli.md",
       "functions/aasol.md",
       ],
     "Scalar Equations" => Any[
       "functions/nsolsc.md",
       "functions/ptcsolsc.md",
       "functions/secant.md",
       ],
     "Linear Solvers" => Any[
       "functions/kl_gmres.md",
       "functions/kl_bicgstab.md",
       ]
]
)
deploydocs(
     repo="github.com/ctkelley/SIAMFANLEquations.jl.git"
)
