var documenterSearchIndex = {"docs":
[{"location":"functions/ptcsc/#ptcsc:-pseuto-transient-continuation","page":"ptcsc: pseuto-transient continuation","title":"ptcsc: pseuto-transient continuation","text":"","category":"section"},{"location":"functions/ptcsc/","page":"ptcsc: pseuto-transient continuation","title":"ptcsc: pseuto-transient continuation","text":"ptcsc(x,f)","category":"page"},{"location":"functions/nsolsc/#nsolsc:-scalar-equation-solver","page":"nsolsc: scalar equation solver","title":"nsolsc: scalar equation solver","text":"","category":"section"},{"location":"functions/nsolsc/","page":"nsolsc: scalar equation solver","title":"nsolsc: scalar equation solver","text":"nsolsc(x,f)","category":"page"},{"location":"functions/nsolsc/#SIAMFANLEquations.nsolsc-Tuple{Any,Any}","page":"nsolsc: scalar equation solver","title":"SIAMFANLEquations.nsolsc","text":"nsolsc(f,x, fp=difffp; rtol=1.e-6, atol=1.e-12, maxit=10,         solver=\"newton\", sham=1, armmax=10, resdec=.1,         armfix=false, printerr=true, keepsolhist=true)\n\nNewton's method for scalar equations. Has most of the features a code for systems of equations needs.\n\nInput:\n\nf: function\n\nx: initial iterate\n\nfp: derivative. If your derivative function is fp, you give me its name. For example fp=foobar tells me that foobar is your function for the derivative. The default is a forward difference Jacobian that I provide.\n\nOptions:\n\nrtol, atol: real and absolute error tolerances\n\nmaxit: upper bound on number of nonlinear iterations\n\nsolver:\n\nYour choices are \"newton\"(default), \"secant\", or \"chord\". However,  you have sham at your disposal only if you chose newton. \"chord\" will keep using the initial derivative until the iterate converges, uses the iteration budget, or the line search fails. It is not the same as sham=Inf, which is smarter.\n\nIf you use secant and your initial iterate is poor, you have made a mistake. I will help you by driving the line search with a finite difference derivative.\n\nsham:\n\nThis is the Shamanskii method. If sham=1, you have Newton. The iteration updates the derivative every sham iterations. The covergence rate has local q-order sham+1 if you only count iteratons where you update the derivative. You need not provide your own derivative function to use this option. sham=Inf is chord only if chord is converging well.\n\narmmax: upper bound on stepsize reductions in linesearch\n\nresdec: target value for residual reduction. \n\nThe default value is .1. In the old MATLAB codes it was .5. I only turn Shamanskii on if the residuals are decreasing rapidly, at least a factor of resdec, and the line search is quiescent. If you want to eliminate resdec from the method ( you don't ) then set resdec = 1.0 and you will never hear from it again.  \n\narmfix:\n\nThe default is a parabolic line search (ie false). Set to true and the stepsize will be fixed at .5. Don't do this unless you are doing experiments for research.\n\nprinterr:\n\nI print a helpful message when the solver fails. To supress that message set printerr to false.\n\nkeepsolhist:\n\nSet this to true to get the history of the iteration in the output tuple. This is on by default for scalar equations and off for systems. Only turn it on if you have use for the data, which can get REALLY LARGE.\n\nOutput:\n\nA tuple (solution, functionval, history, stats, idid, solhist) where history is the vector of residual norms (|f(x)|) for the iteration and stats is a tuple of the history of (ifun, ijac, iarm), the number of functions/derivatives/steplength reductions at each iteration.\n\nI do not count the function values for a finite-difference derivative because they count toward a Jacobian evaluation. I do count them for the secant method model.\n\nidid=true if the iteration succeeded and false if not.\n\nsolhist:\n\nThis is the entire history of the iteration if you've set keepsolhist=true\n\nExamples\n\njulia> nsolout=nsolsc(atan,1.0;maxit=5);\n\njulia> nsolout.history\n5-element Array{Float64,1}:\n 7.85398e-01\n 5.18669e-01\n 1.16332e-01\n 1.06102e-03\n 7.96200e-10\n\njulia> fs(x)=x^2-4.0; fsp(x)=2x;\n\njulia> nsolout=nsolsc(fs,1.0,fsp; maxit=5);\n\njulia> [nsolout.solhist nsolout.history]\n5×2 Array{Float64,2}:\n 1.00000e+00  3.00000e+00\n 2.50000e+00  2.25000e+00\n 2.05000e+00  2.02500e-01\n 2.00061e+00  2.43940e-03\n 2.00000e+00  3.71689e-07\n\n\n\n\n\n","category":"method"},{"location":"#SIAMFANLEquations.jl","page":"Home","title":"SIAMFANLEquations.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"C. T. Kelley","category":"page"},{"location":"","page":"Home","title":"Home","text":"SIAMFANLEquations.jl is the package of solvers and test problems for the book","category":"page"},{"location":"","page":"Home","title":"Home","text":"Solving Nonlinear Equations with Iterative Methods: Solvers and Examples in Julia","category":"page"},{"location":"","page":"Home","title":"Home","text":"This documentation is sketchy and designed to get you going, but the real deal is the IJulia notebook","category":"page"},{"location":"#Scalar-Equations:-Chapter-1","page":"Home","title":"Scalar Equations: Chapter 1","text":"","category":"section"},{"location":"#Algorithms","page":"Home","title":"Algorithms","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The examples in the first chapter are scalar equations that illustrate many of the important ideas in nonlinear solvers. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"infrequent reevaluation of the derivative \nsecant equation approximation of the derivative\nline searches\npseudo-transient continuation","category":"page"},{"location":"#Nonlinear-systems-with-direct-linear-solvers:-Chapter-2","page":"Home","title":"Nonlinear systems with direct linear solvers: Chapter 2","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The ideas from Chapter 1 remain important here. For systems the Newton step is the solution of the linear system","category":"page"},{"location":"","page":"Home","title":"Home","text":"F(x) = - F(x)","category":"page"},{"location":"","page":"Home","title":"Home","text":"This chapter is about solving the equation for the Newton step with Gaussian elimination. Infrequent reevaluation of Fmeans that we also factor F infrequenly, so the impact of this idea is greater. Even better, there is typically no loss in the nonlinear iteration if we do that factorization in single precision. You an make that happen by giving nsold and ptcd the single precision storage for the Jacobian. Half precision is also possible, but is a very, very bad idea. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"Bottom line: single precision can cut the linear algebra cost in half with no loss in the quality of the solution or the number of nonlinear iterations it taks to get there.","category":"page"},{"location":"#Nonlinear-systems-with-iterative-linear-solvers:-Chapter-3","page":"Home","title":"Nonlinear systems with iterative linear solvers: Chapter 3","text":"","category":"section"},{"location":"#Overview-of-the-Codes","page":"Home","title":"Overview of the Codes","text":"","category":"section"},{"location":"#Scalar-Equations:-Chapter-1-2","page":"Home","title":"Scalar Equations: Chapter 1","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"There are two codes for the methods in this chapter","category":"page"},{"location":"","page":"Home","title":"Home","text":"nsolsc.jl is all variations of Newton's method except  pseudo transient continuation. The methods are\nNewton's method \nThe Shamanskii method, where the derivative evaluation is done every m iterations. m=1 is Newton and m=infty is chord.\nThe secant method\nYou have the option to do an Armijo line search for all the methods.\nptcsc.jl is pseudo-transient continuation. ","category":"page"},{"location":"#Nonlinear-systems-with-direct-linear-solvers:-Chapter-2-2","page":"Home","title":"Nonlinear systems with direct linear solvers: Chapter 2","text":"","category":"section"},{"location":"#Nonlinear-systems-with-iterative-linear-solvers:-Chapter-3-2","page":"Home","title":"Nonlinear systems with iterative linear solvers: Chapter 3","text":"","category":"section"}]
}
