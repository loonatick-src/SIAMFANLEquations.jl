var documenterSearchIndex = {"docs":
[{"location":"functions/secant/#secant:-scalar-equation-solver","page":"secant: scalar equation solver","title":"secant: scalar equation solver","text":"","category":"section"},{"location":"functions/secant/","page":"secant: scalar equation solver","title":"secant: scalar equation solver","text":"secant(f,x)","category":"page"},{"location":"functions/secant/#SIAMFANLEquations.secant-Tuple{Any,Any}","page":"secant: scalar equation solver","title":"SIAMFANLEquations.secant","text":"secant(f,x0; rtol=1.e-6, atol=1.e-12, maxit=10,         armmax=10, armfix=false, pdata=nothing,         printerr=true, keepsolhist=true, stagnationok=false)\n\nC. T. Kelley, 2020\n\nThe secant method for scalar equations. Has most of the features a Broyden method code for systems of equations needs.\n\nInput:\n\nf: function\n\nx0: initial iterate\n\nKeyword Arguments (kwargs):\n\nrtol, atol: real and absolute error tolerances\n\nmaxit: upper bound on number of nonlinear iterations\n\nIf you use secant and your initial iterate is poor, you have made a mistake. You will get an error message.\n\narmmax: upper bound on stepsize reductions in linesearch\n\narmfix:\n\nThe default is a parabolic line search (ie false). Set to true and the stepsize will be fixed at .5. Don't do this unless you are doing experiments for research.\n\nprinterr:\n\nI print a helpful message when the solver fails. To supress that message set printerr to false.\n\nkeepsolhist:\n\nSet this to true to get the history of the iteration in the output tuple. This is on by default for scalar equations and off for systems. Only turn it on if you have use for the data, which can get REALLY LARGE.\n\nstagnationok:\n\nSet this to true if you want to disable the line search and either observe divergence or stagnation. This is only useful for research or writing a book.\n\nOutput:\n\nA named tuple (solution, functionval, history, stats, idid,                errcode, solhist) where\n\nsolution = converged result functionval = F(solution) history = the vector of residual norms (||F(x)||) for the iteration stats = named tuple of the history of (ifun, ijac, iarm), the number of functions/derivatives/steplength reductions at each iteration. For the secant method, ijac = 0.\n\nidid=true if the iteration succeeded and false if not.\n\nerrcode = 0 if if the iteration succeeded         = -1 if the initial iterate satisifies the termination criteria         = 10 if no convergence after maxit iterations         = 1  if the line search failed\n\nsolhist:\n\nThis is the entire history of the iteration if you've set keepsolhist=true\n\nsecant builds solhist with a function from the Tools directory. For systems, solhist is an N x K array where N is the length of x and K  is the number of iteration + 1. So, for scalar equations (N=1), solhist is a row vector. Hence the use of solhist' in the example below.\n\nExamples\n\n\njulia> secout=secant(atan,1.0;maxit=6,atol=1.e-12,rtol=1.e-12);\n\n\njulia> secout.history\n7-element Array{Float64,1}:\n 7.85398e-01\n 5.18729e-01\n 5.39030e-02\n 4.86125e-03\n 4.28860e-06\n 3.37529e-11\n 2.06924e-22\n\n\n\n\n\n","category":"method"},{"location":"functions/kl_gmres/#kl_gmres:-GMRES-linear-solver","page":"kl_gmres: GMRES linear solver","title":"kl_gmres: GMRES linear solver","text":"","category":"section"},{"location":"functions/kl_gmres/","page":"kl_gmres: GMRES linear solver","title":"kl_gmres: GMRES linear solver","text":"kl_gmres(x0, b, atv, V, eta, ptv=klnopc)","category":"page"},{"location":"functions/kl_gmres/#SIAMFANLEquations.kl_gmres","page":"kl_gmres: GMRES linear solver","title":"SIAMFANLEquations.kl_gmres","text":"kl_gmres(x0, b, atv, V, eta, ptv=klnopc;              orth = \"cgs2\", side=\"left\", pdata=nothing)\n\nGmres linear solver. Handles preconditioning and (coming soon) restarts.  Uses gmres_base which is completely oblivious to these things.\n\nThe deal is\n\nInput:\n\nx0:  initial iterate, this is usually zero for nonlinear solvers\n\nb: right hand side (duh!)\n\natv:  matrix-vector product which depends on precomputed data pdta       I expect you to use pdata most or all of the time, so it is not       a keyword argument (at least for now). If your mat-vec is just       A*v, you have to write a function where A is the precomputed data.       API for atv is ax=atv(x,pdata)\n\nV:  Preallocated n x K array for the Krylov vectors. I store the initial     normalized residual in column 1, so  you have at most K-1 iterations     before gmresbase returns a failure. klgmres will handle the restarts.\n\neta: Termination happens when ||b - Ax|| <= eta || b ||\n\nptv:  preconditioner-vector product, which will also use pdata. The       default is klnopc, which is no preconditioning at all.       API for ptv is px=ptv(x,pdata)\n\nKeyword arguments\n\npdata: precomputed data. The default is nothing, but that ain't gonna         work well for nonlinear equations.\n\north: your choice of the wise default, classical Gram-Schmidt twice,        or something slow and less stable. Those are classical once (really        bad) or a couple variants of modified Gram-Schmidt. mgs2 is what I        used in my old matlab codes. Not terrible, but far from great.\n\nside: left or right preconditioning. The default is \"left\".\n\nOther parameters on the way.\n\nOutput:\n\nA named tuple (sol, reshist, lits, idid)\n\nwhere\n\nsol= final result reshist = residual norm history lits = number of iterations idid = status of the iteration        true -> converged         false -> failed to converge\n\n\n\n\n\n","category":"function"},{"location":"functions/ptcsol/#ptcsol:-Pseudo-Transient-Continuation-Solver","page":"ptcsol: Pseudo-Transient Continuation Solver","title":"ptcsol: Pseudo-Transient Continuation Solver","text":"","category":"section"},{"location":"functions/ptcsol/","page":"ptcsol: Pseudo-Transient Continuation Solver","title":"ptcsol: Pseudo-Transient Continuation Solver","text":"ptcsol(F!, x0, FS, FPS, J!=diffjac!)","category":"page"},{"location":"functions/ptcsol/#SIAMFANLEquations.ptcsol-NTuple{5,Any}","page":"ptcsol: Pseudo-Transient Continuation Solver","title":"SIAMFANLEquations.ptcsol","text":"ptcsol(F!, x0, FS, FPS, J! = diffjac!; rtol=1.e-6, atol=1.e-12,                maxit=20, dt0=1.e-6, dx=1.e-7, pdata = nothing, jfact = klfact,                printerr = true, keepsolhist = false)\n\nC. T. Kelley, 2020\n\nJulia versions of the nonlinear solvers from my SIAM books.  Herewith: some new stuff ==> ptcsol\n\nYou must allocate storage for the function and Jacobian in advance –> in the calling program <– ie. in FS and FPS\n\nInputs:\n\nF!: function evaluation, the ! indicates that F! overwrites FS, your   preallocated storage for the function.\nSo, FV=F!(FV,x) or FV=F!(FV,x,pdata) returns FV=F(x)\nx0: initial iterate\n\nFS: Preallocated storage for function. It is an N x 1 column vector.\n\nYou may dimension it as (n,) or (n,1). (n,) is best, but the solvers can deal with it either way.\n\nFPS: preallocated storage for Jacobian. It is an N x N matrix\n\nJ!: Jacobian evaluation, the ! indicates that J! overwrites FPS, your   preallocated storage for the Jacobian. If you leave this out the   default is a finite difference Jacobian.\nSo, FP=J!(FP,FV,x) or FP=J!(FP,FV,x,pdata) returns FP=F'(x);   (FP,FV, x) must be the argument list, even if FP does not need FV.   One reason for this is that the finite-difference Jacobian   does and that is the default in the solver.\nPrecision: Lemme tell ya 'bout precision. I designed this code for    full precision   functions and linear algebra in any precision you want. You can declare   FPS as Float64, Float32, or Float16 and ptcsol will do the right thing if   YOU do not destroy the declaration in your J! function. I'm amazed   that this works so easily. If the Jacobian is reasonably well   conditioned, you can cut the cost of Jacobian factorization and   storage in half with no loss. For large dense Jacobians and inexpensive   functions, this is a good deal.\nBUT ... There is very limited support for direct sparse solvers in   anything other than Float64. I recommend that you only use Float64   with direct sparse solvers unless you really know what you're doing. I   have a couple examples in the notebook, but watch out.\n\n\n\nKeyword Arguments (kwargs):\n\nrtol and atol: relative and absolute error tolerances\n\ndt0: initial time step. The default value of 1.e-3 is a bit conservative and is one option you really should play with. Look at the example where I set it to 1.0!\n\nmaxit: limit on nonlinear iterations, default=100. \n\nThis is coupled to dt0. If your choice of dt0 is too small (conservative) then you'll need many iterations to converge and will need a larger value of maxit\n\nFor PTC you'll need more iterations than for a straight-up nonlinear solve. This is part of the price for finding the  stable solution.\n\ndx: default = 1.e-7\n\ndifference increment in finite-difference derivatives       h=dx*norm(x)+1.e-6\n\npdata:\n\nprecomputed data for the function/Jacobian.  Things will go better if you use this rather than hide the data  in global variables within the module for your function/Jacobian\n\njfact: default = klfact (tries to figure out best choice) \n\nIf your Jacobian has any special structure, please set jfact to the correct choice for a factorization.\n\nI use jfact when I call PTCUpdate to evaluate the Jacobian (using your J!) and factor it. The default is to use klfact (an internal function) to do something reasonable. For general matrices, klfact picks lu! to compute an LU factorization and share storage with the Jacobian.  You may change LU to something else by, for example, setting jfact = cholseky! if your Jacobian is spd.\n\nklfact knows about banded matrices and picks qr. You should, however RTFM, allocate the extra two upper bands, and use jfact=qr! to override klfact.\n\nIf you give me something that klfact does not know how to dispatch on, then nothing happens. I just return the original Jacobian matrix and  ptcsol will use backslash to compute the Newton step.\n\nI know that this is probably not optimal in your situation, so it is  good to pick something else, like jfact = lu.\n\nprinterr: default = true\n\nI print a helpful message when the solver fails. To suppress that message set printerr to false.\n\nkeepsolhist: default = false\n\nSet this to true to get the history of the iteration in the output tuple. This is on by default for scalar equations and off for systems. Only turn it on if you have use for the data, which can get REALLY LARGE.\n\nOutput:\n\nA named tuple (solution, functionval, history, stats, idid,                errcode, solhist) where\n\nsolution = converged result functionval = F(solution) history = the vector of residual norms (||F(x)||) for the iteration stats = named tuple of the history of (ifun, ijac, iarm), the number of functions/derivatives/steplength reductions at each iteration.\n\nI do not count the function values for a finite-difference derivative because they count toward a Jacobian evaluation. \n\nidid=true if the iteration succeeded and false if not.\n\nerrcode = 0 if if the iteration succeeded         = -1 if the initial iterate satisfies the termination criteria         = 10 if no convergence after maxit iterations         = 1  if the line search failed\n\nsolhist:\n\nThis is the entire history of the iteration if you've set keepsolhist=true\n\nsolhist is an N x K array where N is the length of x and K is the number of iteration + 1. So, for scalar equations, it's a row vector.\n\n\n\n\n\n","category":"method"},{"location":"functions/nsolsc/#nsolsc:-scalar-equation-solver","page":"nsolsc: scalar equation solver","title":"nsolsc: scalar equation solver","text":"","category":"section"},{"location":"functions/nsolsc/","page":"nsolsc: scalar equation solver","title":"nsolsc: scalar equation solver","text":"nsolsc(f,x)","category":"page"},{"location":"functions/nsolsc/#SIAMFANLEquations.nsolsc-Tuple{Any,Any}","page":"nsolsc: scalar equation solver","title":"SIAMFANLEquations.nsolsc","text":"nsolsc(f,x0, fp=difffp; rtol=1.e-6, atol=1.e-12, maxit=10,         solver=\"newton\", sham=1, armmax=10, resdec=.1, dx=1.e-7,         armfix=false, pdata=nothing,         printerr=true, keepsolhist=true, stagnationok=false)\n\nC. T. Kelley, 2020\n\nNewton's method for scalar equations. Has most of the features a code for systems of equations needs. This is a wrapper for a call to nsol.jl, the real code for systems. \n\nInput:\n\nf: function\n\nx0: initial iterate\n\nfp: derivative. If your derivative function is fp, you give me its name. For example fp=foobar tells me that foobar is your function for the derivative. The default is a forward difference Jacobian that I provide.\n\nKeyword Arguments (kwargs):\n\nrtol, atol: real and absolute error tolerances\n\nmaxit: upper bound on number of nonlinear iterations\n\nsolver:\n\nYour choices are \"newton\"(default) or \"chord\". However,  you have sham at your disposal only if you chose newton. \"chord\" will keep using the initial derivative until the iterate converges, uses the iteration budget, or the line search fails. It is not the same as sham=Inf, which is smarter.\n\nIf you use secant and your initial iterate is poor, you have made a mistake. I will help you by driving the line search with a finite difference derivative.\n\nsham:\n\nThis is the Shamanskii method. If sham=1, you have Newton. The iteration updates the derivative every sham iterations. The convergence rate has local q-order sham+1 if you only count iterations where you update the derivative. You need not provide your own derivative function to use this option. sham=Inf is chord only if chord is converging well.\n\narmmax: upper bound on stepsize reductions in linesearch\n\nresdec: target value for residual reduction. \n\nThe default value is .1. In the old MATLAB codes it was .5. I only turn Shamanskii on if the residuals are decreasing rapidly, at least a factor of resdec, and the line search is quiescent. If you want to eliminate resdec from the method ( you don't ) then set resdec = 1.0 and you will never hear from it again.  \n\ndx:\n\nThis is the increment for forward difference, default = 1.e-7. dx should be roughly the square root of the noise in the function.\n\narmfix:\n\nThe default is a parabolic line search (ie false). Set to true and the stepsize will be fixed at .5. Don't do this unless you are doing experiments for research.\n\npdata:\n\nprecomputed data for the function/derivative. Things will go better if you use this rather than hide the data in global variables within the module for your function/derivative If you use this option your function and derivative must take pdata as a second argument. eg f(x,pdata) and fp(x,pdata)\n\nprinterr:\n\nI print a helpful message when the solver fails. To supress that message set printerr to false.\n\nkeepsolhist:\n\nSet this to true to get the history of the iteration in the output tuple. This is on by default for scalar equations and off for systems. Only turn it on if you have use for the data, which can get REALLY LARGE.\n\nstagnationok:\n\nSet this to true if you want to disable the line search and either observe divergence or stagnation. This is only useful for research or writing a book.\n\nOutput:\n\nA named tuple (solution, functionval, history, stats, idid,                errcode, solhist) where\n\nsolution = converged result functionval = F(solution) history = the vector of residual norms (||F(x)||) for the iteration stats = named tuple of the history of (ifun, ijac, iarm), the number of functions/derivatives/steplength reductions at each iteration.\n\nI do not count the function values for a finite-difference derivative because they count toward a Jacobian evaluation. I do count them for the secant method model.\n\nidid=true if the iteration succeeded and false if not.\n\nerrcode = 0 if if the iteration succeeded         = -1 if the initial iterate satisifies the termination criteria         = 10 if no convergence after maxit iterations         = 1  if the line search failed\n\nsolhist:\n\nThis is the entire history of the iteration if you've set keepsolhist=true\n\nnsolsc builds solhist with a function from the Tools directory. For systems, solhist is an N x K array where N is the length of x and K  is the number of iteration + 1. So, for scalar equations (N=1), solhist is a row vector. Hence the use of solhist' in the example below.\n\nExamples\n\njulia> nsolout=nsolsc(atan,1.0;maxit=5,atol=1.e-12,rtol=1.e-12);\n\njulia> nsolout.history\n6-element Array{Float64,1}:\n 7.85398e-01\n 5.18669e-01\n 1.16332e-01\n 1.06102e-03\n 7.96200e-10\n 2.79173e-24\n\nIf you have an analytic derivative, I will use it.\n\njulia> fs(x)=x^2-4.0; fsp(x)=2x;\n\njulia> nsolout=nsolsc(fs,1.0,fsp; maxit=5,atol=1.e-9,rtol=1.e-9);\n\njulia> [nsolout.solhist'.-2 nsolout.history]\n6×2 Array{Float64,2}:\n -1.00000e+00  3.00000e+00\n  5.00000e-01  2.25000e+00\n  5.00000e-02  2.02500e-01\n  6.09756e-04  2.43940e-03\n  9.29223e-08  3.71689e-07\n  2.22045e-15  8.88178e-15\n\n\n\n\n\n\n","category":"method"},{"location":"functions/nsol/#nsol:-systems-of-equations-with-direct-linear-solvers","page":"nsol: systems of equations with direct linear solvers","title":"nsol: systems of equations with direct linear solvers","text":"","category":"section"},{"location":"functions/nsol/","page":"nsol: systems of equations with direct linear solvers","title":"nsol: systems of equations with direct linear solvers","text":"nsol(F!, x0, FS, FPS, J!=diffjac!)","category":"page"},{"location":"functions/nsol/#SIAMFANLEquations.nsol-NTuple{5,Any}","page":"nsol: systems of equations with direct linear solvers","title":"SIAMFANLEquations.nsol","text":"nsol(F!, x0, FS, FPS, J!=diffjac!; rtol=1.e-6, atol=1.e-12,\n           maxit=20, solver=\"newton\", sham=5, armmax=10, resdec=.1,\n           dx = 1.e-7, armfix=false, \n           pdata = nothing, jfact = klfact,\n           printerr = true, keepsolhist = false, stagnationok=false)\n\n)\n\nC. T. Kelley, 2020\n\nJulia versions of the nonlinear solvers from my SIAM books.  Herewith: nsol\n\nYou must allocate storage for the function and Jacobian in advance –> in the calling program <– ie. in FS and FPS\n\nInputs:\n\nF!: function evaluation, the ! indicates that F! overwrites FS, your   preallocated storage for the function.\nSo FS=F!(FS,x) or FS=F!(FS,x,pdata) returns FS=F(x)\n\nx0: initial iterate\n\nFS: Preallocated storage for function. It is an N x 1 column vector\n\nFPS: preallocated storage for Jacobian. It is an N x N matrix\n\nJ!: Jacobian evaluation, the ! indicates that J! overwrites FPS, your   preallocated storage for the Jacobian. If you leave this out the   default is a finite difference Jacobian.\nSo, FP=J!(FP,FS,x) or FP=J!(FP,FS,x,pdata) returns FP=F'(x). \n(FP,FS, x) must be the argument list, even if FP does not need FS.   One reason for this is that the finite-difference Jacobian   does and that is the default in the solver.\nPrecision: Lemme tell ya 'bout precision. I designed this code for    full precision functions and linear algebra in any precision you want.    You can declare   FPS as Float64, Float32, or Float16 and nsol will do the right thing if   YOU do not destroy the declaration in your J! function. I'm amazed   that this works so easily. If the Jacobian is reasonably well    conditioned, you can cut the cost of Jacobian factorization and   storage in half with no loss. For large dense Jacobians and inexpensive   functions, this is a good deal.\nBUT ... There is very limited support for direct sparse solvers in   anything other than Float64. I recommend that you only use Float64   with direct sparse solvers unless you really know what you're doing. I   have a couple examples in the notebook, but watch out.\n\n\n\nKeyword Arguments (kwargs):\n\nrtol and atol: relative and absolute error tolerances\n\nmaxit: limit on nonlinear iterations\n\nsolver: default = \"newton\"\n\nYour choices are \"newton\" or \"chord\". However, you have sham at your disposal only if you chose newton. \"chord\" will keep using the initial derivative until the iterate converges, uses the iteration budget, or the line search fails. It is not the same as sham=Inf, which is smarter.\n\nsham: default = 5 (ie Newton)\n\nThis is the Shamanskii method. If sham=1, you have Newton. The iteration updates the derivative every sham iterations. The convergence rate has local q-order sham+1 if you only count iterations where you update the derivative. You need not provide your own derivative function to use this option. sham=Inf is chord only if chord is converging well.\n\nI made sham=1 the default for scalar equations. For systems I'm more aggressive and want to invest as little energy in linear algebra as possible. So the default is sham=5.\n\narmmax: upper bound on step size reductions in line search\n\nresdec: default = .1\n\nThis is the target value for residual reduction. The default value is .1. In the old MATLAB codes it was .5. I only turn Shamanskii on if the residuals are decreasing rapidly, at least a factor of resdec, and the line search is quiescent. If you want to eliminate resdec from the method ( you don't ) then set resdec = 1.0 and you will never hear from it again.\n\ndx: default = 1.e-7\n\ndifference increment in finite-difference derivatives       h=dx*norm(x,Inf)+1.e-8\n\narmfix: default = false\n\nThe default is a parabolic line search (ie false). Set to true and the step size will be fixed at .5. Don't do this unless you are doing experiments for research.\n\npdata:\n\nprecomputed data for the function/Jacobian.  Things will go better if you use this rather than hide the data  in global variables within the module for your function/Jacobian\n\njfact: default = klfact (tries to figure out best choice) \n\nIf your Jacobian has any special structure, please set jfact to the correct choice for a factorization.\n\nI use jfact when I call PrepareJac! to evaluate the Jacobian (using your J!) and factor it. The default is to use klfact (an internal function) to do something reasonable. For general matrices, klfact picks lu! to compute an LU factorization and share storage with the Jacobian.  You may change LU to something else by, for example, setting jfact = cholseky! if your Jacobian is spd.\n\nklfact knows about banded matrices and picks qr. You should, however RTFM, allocate the extra two upper bands, and use jfact=qr! to override klfact.\n\nIf you give me something that klfact does not know how to dispatch on, then nothing happens. I just return the original Jacobian matrix and  nsol will use backslash to compute the Newton step. I know that this is probably not optimal in your situation, so it is  good to pick something else, like jfact = lu.\n\nPlease do not mess with the line that calls PrepareJac!. \n\n    FPF = PrepareJac!(FPS, FS, x, ItRules)\n\nFPF is not the same as FPS (the storage you allocate for the Jacobian) for a reason. FPF and FPS do not have the same type, even though they share storage. So, FPS=PrepareJac!(FPS, FS, ...) will break things.\n\nprinterr: default = true\n\nI print a helpful message when the solver fails. To suppress that message set printerr to false.\n\nkeepsolhist: default = false\n\nSet this to true to get the history of the iteration in the output tuple. This is on by default for scalar equations and off for systems. Only turn it on if you have use for the data, which can get REALLY LARGE.\n\nstagnationok: default = false\n\nSet this to true if you want to disable the line search and either observe divergence or stagnation. This is only useful for research or writing a book.\n\nOutput:\n\nA named tuple (solution, functionval, history, stats, idid,                errcode, solhist) where\n\nsolution = converged result functionval = F(solution) history = the vector of residual norms (||F(x)||) for the iteration stats = named tuple of the history of (ifun, ijac, iarm), the number of functions/derivatives/steplength reductions at each iteration.\n\nI do not count the function values for a finite-difference derivative because they count toward a Jacobian evaluation. \n\nidid=true if the iteration succeeded and false if not.\n\nerrcode = 0 if if the iteration succeeded         = -1 if the initial iterate satisfies the termination criteria         = 10 if no convergence after maxit iterations         = 1  if the line search failed\n\nsolhist:\n\nThis is the entire history of the iteration if you've set keepsolhist=true\n\nsolhist is an N x K array where N is the length of x and K is the number of iteration + 1. So, for scalar equations, it's a row vector.\n\n\n\nExamples\n\nWorld's easiest problem example. Test 64 and 32 bit Jacobians. No meaningful difference in the residual histories or the converged solutions.\n\n julia> function f!(fv,x)\n       fv[1]=x[1] + sin(x[2])\n       fv[2]=cos(x[1]+x[2])\n       end\nf (generic function with 1 method)\n\njulia> x=ones(2,); fv=zeros(2,); jv=zeros(2,2); jv32=zeros(Float32,2,2);\njulia> nout=nsol(f!,x,fv,jv; sham=1);\njulia> nout32=nsol(f!,x,fv,jv32; sham=1);\njulia> [nout.history nout32.history]\n5×2 Array{Float64,2}:\n 1.88791e+00  1.88791e+00\n 2.43119e-01  2.43119e-01\n 1.19231e-02  1.19231e-02\n 1.03266e-05  1.03262e-05\n 1.46416e-11  1.43548e-11\n\njulia> [nout.solution nout.solution - nout32.solution]\n2×2 Array{Float64,2}:\n -7.39085e-01  -5.42899e-14\n  2.30988e+00   3.49498e-13\n\nH-equation example. I'm taking the sham=5 default here, so the convergence is not quadratic. The good news is that we evaluate the Jacobian only once.\n\njulia> n=16; x0=ones(n,); FV=ones(n,); JV=ones(n,n);\njulia> hdata=heqinit(x0, .5);\njulia> hout=nsol(heqf!,x0,FV,JV;pdata=hdata);\njulia> hout.history\n4-element Array{Float64,1}:\n 6.17376e-01\n 3.17810e-03\n 2.75227e-05\n 2.35817e-07\n\n\n\n\n\n","category":"method"},{"location":"functions/ptcsolsc/#ptcsolsc:-pseudo-transient-continuation","page":"ptcsolsc: pseudo-transient continuation","title":"ptcsolsc: pseudo-transient continuation","text":"","category":"section"},{"location":"functions/ptcsolsc/","page":"ptcsolsc: pseudo-transient continuation","title":"ptcsolsc: pseudo-transient continuation","text":"ptcsolsc(x,f)","category":"page"},{"location":"functions/ptcsolsc/#SIAMFANLEquations.ptcsolsc-Tuple{Any,Any}","page":"ptcsolsc: pseudo-transient continuation","title":"SIAMFANLEquations.ptcsolsc","text":"ptcsolsc(f, x0, fp=difffp; rtol=1.e-6, atol=1.e-12, maxit=100,         dt0=1.e-6, dx=1.e-7, pdata=nothing, printerr = true, keepsolhist=true)\n\nC. T. Kelley, 2020\n\nScalar pseudo-transient continuation solver. PTC is designed to find stable steady state solutions of \n\ndx/dt = - f(x)\n\nThe scalar code is a simple wrapper around a call to ptcsol.jl, the  PTC solver for systems.\n\n–> PTC is ABSOLUTELY NOT a general purpose nonlinear solver.\n\nInput:\n\nf: function\n\nx: initial iterate/data\n\nfp: derivative. If your derivative function is fp, you give me its name. For example fp=foobar tells me that foobar is your function for the derivative. The default is a forward difference Jacobian that I provide.\n\nKeyword Arguments:\n\nrtol, atol: real and absolute error tolerances\n\nmaxit: upper bound on number of nonlinear iterations. This is  coupled to dt0. If your choice of dt0 is too small (conservative) then you'll need many iterations to converge and will need a larger value of maxit.\n\ndt0: initial time step. The default value of 1.e-3 is a bit conservative  and is one option you really should play with. Look at the example where I set it to 1.0!\n\ndx: default = 1.e-7\n\ndifference increment in finite-difference derivatives       h=dx*norm(x)+1.e-6\n\npdata:\n\nprecomputed data for the function/derivative. Things will go better if you use this rather than hide the data in global variables within the module for your function/derivative If you use this option your function and derivative must take pdata  as a second argument. eg f(x,pdata) and fp(x,pdata)\n\nprinterr: default = true\n\nI print a helpful message when the solver fails. To supress that message set printerr to false.\n\nkeepsolhist: if true you get the history of the iteration in the output  tuple. This is on by default for scalar equations and off for systems. Only turn it on if you have use for the data, which can get REALLY LARGE.\n\nOutput: A tuple (solution, functionval, history, idid, errcode, solhist) where history is the array of absolute function values |f(x)| of residual norms and time steps. Unless something has gone badly wrong, dt approx |f(x_0)|/|f(x)|.\n\nidid=true if the iteration succeeded and false if not.\n\nerrcode = 0 if if the iteration succeeded         = -1 if the initial iterate satisifies the termination criteria         = 10 if no convergence after maxit iterations\n\nsolhist=entire history of the iteration if keepsolhist=true\n\nptcsolsc builds solhist with a function from the Tools directory. For systems, solhist is an N x K array where N is the length of x and K  is the number of iteration + 1. So, for scalar equations (N=1), solhist is a row vector. Hence I use [ptcout.solhist' ptcout.history] in the example below.\n\nIf the iteration fails it's time to play with the tolerances, dt0, and maxit. You are certain to fail if there is no stable solution to the equation.\n\nExamples\n\njulia> ptcout=ptcsolsc(sptest,.2;dt0=2.0,rtol=1.e-3,atol=1.e-3);\n\njulia> [ptcout.solhist' ptcout.history]\n7×2 Array{Float64,2}:\n 2.00000e-01  9.20000e-02\n 9.66666e-01  4.19962e-01\n 8.75086e-01  2.32577e-01\n 7.99114e-01  1.10743e-01\n 7.44225e-01  4.00926e-02\n 7.15163e-01  8.19395e-03\n 7.07568e-01  4.61523e-04\n\n\n\n\n\n","category":"method"},{"location":"#SIAMFANLEquations.jl-v0.3.0","page":"Home","title":"SIAMFANLEquations.jl v0.3.0","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"C. T. Kelley","category":"page"},{"location":"","page":"Home","title":"Home","text":"SIAMFANLEquations.jl is the package of solvers and test problems for the book","category":"page"},{"location":"","page":"Home","title":"Home","text":"Solving Nonlinear Equations with Iterative Methods: Solvers and Examples in Julia","category":"page"},{"location":"","page":"Home","title":"Home","text":"Testing github actions: Working now. The next tag is the bit test.","category":"page"},{"location":"","page":"Home","title":"Home","text":"This documentation is sketchy and designed to get you going, but the real deal is the IJulia notebook","category":"page"},{"location":"","page":"Home","title":"Home","text":"This is version 0.3.0. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"This version will feature Chapter 3, Newton-Krylov solvers. I at work on the examples and the GMRES and BiCGStab solvers. I write my own Krylov solvers so they will communicate with the nonlinear solvers the way I want and so I can do GMRES my way (classical Gram-Schmidt twice!). The nonlinear part won't be so bad once the linear solvers do what I want.","category":"page"},{"location":"#Scalar-Equations:-Chapter-1","page":"Home","title":"Scalar Equations: Chapter 1","text":"","category":"section"},{"location":"#Algorithms","page":"Home","title":"Algorithms","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The examples in the first chapter are scalar equations that illustrate many of the important ideas in nonlinear solvers. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"infrequent reevaluation of the derivative \nsecant equation approximation of the derivative\nline searches\npseudo-transient continuation","category":"page"},{"location":"","page":"Home","title":"Home","text":"Leaving out the kwargs, the calling sequence for getting nsolsc to solve f(x) = 0 is","category":"page"},{"location":"","page":"Home","title":"Home","text":"nsolsc(f,x, fp=difffp)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Here x is the initial iterate and fp (optional) is the function for evaluating the derivative. If you leave fp out, nsold uses a forward difference approximation.","category":"page"},{"location":"","page":"Home","title":"Home","text":"See the code overview or the notebook for details. Here are a couple  of simple examples.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Solve atan(x) = 0 with x_0 = 0 as the initial iterate and a finite difference approximation to the derivative. The output of nsolsc is a tuple. The history vector contains the nonlinear residual norm. In this example I've limited the number of iterations to 5, so history has 6 components (including the initial residual, iteration 0).","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> nsolout=nsolsc(atan,1.0;maxit=5,atol=1.e-12,rtol=1.e-12);\n\njulia> nsolout.history\n6-element Array{Float64,1}:\n 7.85398e-01\n 5.18669e-01\n 1.16332e-01\n 1.06102e-03\n 7.96200e-10\n 2.79173e-24","category":"page"},{"location":"","page":"Home","title":"Home","text":"Now try the same problem with the secant method. I'll need one more iteration to meet the termination criterion.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> secout=secant(atan,1.0;maxit=6,atol=1.e-12,rtol=1.e-12);\n\n\njulia> secout.history\n7-element Array{Float64,1}:\n 7.85398e-01\n 5.18729e-01\n 5.39030e-02\n 4.86125e-03\n 4.28860e-06\n 3.37529e-11\n 2.06924e-22","category":"page"},{"location":"","page":"Home","title":"Home","text":"In this example I define a function and its derivative and send that to nsolsc. I print both the history vectors and the solution history.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> fs(x)=x^2-4.0; fsp(x)=2x;\n\njulia> nsolout=nsolsc(fs,1.0,fsp; maxit=5,atol=1.e-9,rtol=1.e-9);\n\njulia> [nsolout.solhist.-2 nsolout.history]\n6×2 Array{Float64,2}:\n -1.00000e+00  3.00000e+00\n  5.00000e-01  2.25000e+00\n  5.00000e-02  2.02500e-01\n  6.09756e-04  2.43940e-03\n  9.29223e-08  3.71689e-07\n  2.22045e-15  8.88178e-15","category":"page"},{"location":"#Nonlinear-systems-with-direct-linear-solvers:-Chapter-2","page":"Home","title":"Nonlinear systems with direct linear solvers: Chapter 2","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The ideas from Chapter 1 remain important here. For systems the Newton step is the solution of the linear system","category":"page"},{"location":"","page":"Home","title":"Home","text":"F(x) s = - F(x)","category":"page"},{"location":"","page":"Home","title":"Home","text":"This chapter is about solving the equation for the Newton step with Gaussian elimination. Infrequent reevaluation of Fmeans that we also factor F infrequently, so the impact of this idea is greater. Even better, there is typically no loss in the nonlinear iteration if we do that factorization in single precision. You an make that happen by giving nsold and ptcsold the single precision storage for the Jacobian. Half precision is also possible, but is a very, very bad idea. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"Bottom line: single precision can cut the linear algebra cost in half with no loss in the quality of the solution or the number of nonlinear iterations it takes to get there.","category":"page"},{"location":"#Overview-of-the-Codes","page":"Home","title":"Overview of the Codes","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The core solvers (so far) are ","category":"page"},{"location":"","page":"Home","title":"Home","text":"nsol.jl is is all variations of Newton's method except pseudo transient continuation. The methods are\nNewton's method\nThe Shamanskii method, where the derivative evaluation is done every m iterations. m=1 is Newton and m=infty is chord.\nI do an Armijo line search for all the methods unless the method is chord or you tell me not to.\nptcsol.jl is pseudo-transient continuation.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The solvers for scalar equations are wrappers for the core codes with the same interface. The expectation is that the scalar codes do not need to manage linear algebra or storage of arrays.","category":"page"},{"location":"#Scalar-Equations:-Chapter-1-2","page":"Home","title":"Scalar Equations: Chapter 1","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"There are two codes for the methods in this chapter","category":"page"},{"location":"","page":"Home","title":"Home","text":"nsolsc.jl is all variations of Newton's method except  pseudo transient continuation. The methods are\nNewton's method \nThe Shamanskii method, where the derivative evaluation is done every m iterations. m=1 is Newton and m=infty is chord.\nI do an Armijo line search for all the methods unless the method is chord or you tell me not to.\nsecant.jl is the scalar secant method. It is a stand-alone code.","category":"page"},{"location":"","page":"Home","title":"Home","text":"I do not know if I'll merge it with the Broyden code or not. It's really too simple to mess with much.","category":"page"},{"location":"","page":"Home","title":"Home","text":"ptcsolsc.jl is pseudo-transient continuation. ","category":"page"},{"location":"#Nonlinear-systems-with-direct-linear-solvers:-Chapter-2-2","page":"Home","title":"Nonlinear systems with direct linear solvers: Chapter 2","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This is the same story as it was for scalar equations, 'ceptin for the linear algebra. The linear solvers for this chapter are the matrix factorizations that live in LinearAlgebra, SuiteSparse, or BandedMatrices. ","category":"page"},{"location":"#Nonlinear-systems-with-iterative-linear-solvers:-Chapter-3","page":"Home","title":"Nonlinear systems with iterative linear solvers: Chapter 3","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The plan was to make this part of nsol and ptcsol. However, the logic","category":"page"},{"location":"","page":"Home","title":"Home","text":"in Newton-Krylov methods is different enough that I'm makeing nsoli and ptcsoli their own codes. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"The GMRES linear solver is 90% done and the documentation is in here.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Bi-CGSTAB is coming, but will be after all the nonlinear stuff is done.","category":"page"},{"location":"#Krylov-linear-solvers.","page":"Home","title":"Krylov linear solvers.","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"kl_gmres: GMRES with orthogonalization via classical Gram-Schmidt twice.","category":"page"}]
}
