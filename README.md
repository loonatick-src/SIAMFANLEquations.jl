| **Documentation**                                                               | **Build Status**                                                                                | **DOI**                                                                                |
|:-------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------- |
| [![][docs-stable-img]][docs-stable-url] [![][docs-dev-img]][docs-dev-url] | [![][build-status-img]][build-status-url] [![][codecov-img]][codecov-url] | [![DOI](https://zenodo.org/badge/256312455.svg)](https://zenodo.org/badge/latestdoi/256312455) |


# SIAMFANLEquations version 0.5.0

[changelog](#Changes)


This is the package with the solvers and test problems for 

# Solving Nonlinear Equations with Iterative Methods: <br> Solvers and Examples in Julia

## [C. T. Kelley](https://ctk.math.ncsu.edu)

This will be a sequel to my book 

(Kel03) C. T. Kelley, [***Solving Nonlinear Equations with Newton's Method***](https://my.siam.org/Store/Product/viewproduct/?ProductId=841) , Fundamentals of Algorithms 1, SIAM 2003.

Hence the notebook and this package all have SIAMFANL in their names.

The new book with have a different algorithm mix and the solvers and examples will be in Juila. The project will have three parts.

   1. A print book: __Under contract with SIAM for manuscript delivery in mid-2022 and publication in late 2022__. 
   2. [An IJulia notebook](https://github.com/ctkelley/NotebookSIAMFANL/releases/tag/v0.5.0) (open source, MIT License, Creative Commons License)
      Versons __0.5.0__ of the notebook and package run correctly and the tagged version of the package should run v0.5.0 of the notebook.
   3. This package (MIT License)<br>

Content changes from (Kel03):

- New solvers: __pseudo-transient continuation__ and __Anderson acceleration__
- Deletions: __Broyden's method__ 
    - Quasi-Newton methods are not used much for nonlinear equations any more. Newton-Krylov has taken over.
- New Case Studies chapter
   
## Readme Contents:
- [Mission](#Package-Mission)
- [Installation](#Installation)
- [Meaning of Version Numbers](#Meaning-of-version-numbers)
- [__Please__ No Pull Requests](#Pull-Requests)
- [Core References and Documentation](#Core-References-and-Documentation)
- [Algorithms and Solvers](#Algorithms-and-Solvers)
- [About the test problems](#Test-Problems)
- [How to cite this stuff](#Citations)
- [What's new in this version since 0.4.3](#Changes)
- [Funding](#Funding) 

## Package Mission

This package is designed and built to support a book project. So the solvers and examples reinforce the algorithmic discussion in the book. General purpose packages have a different mission.

## Installation: 

- Use Julia 1.7.1 (or LTS 1.6.5) and up with this thing!!!
- This package has been tested on Julia 1.6.5 and 1.7.1. __The package no longer works on 1.5 or earlier!__ 
- __Versions 1.7.0 and 1.6.4 break the notebooks. This is a known bug and got fixed with 1.7.1 and 1.6.5.__

Type this 

```
] add SIAMFANLEquations
```

or this

```
import Pkg; Pkg.add("SIAMFANLEquations")
```
in the REPL to install the package.

Then, as usual
```
using SIAMFANLequations
```
enables you to use the codes. You'll need
```
using SIAMFANLEquations.TestProblems
```
to run the test problems. Then there are the examples you get with
```
using SIAMFANLEquations.Examples
```
for the unit tests, the examples in the book, and the notebook.


## Meaning of version numbers

If __log(version_number) < 0__ there's trouble!

This is version v0.5.0: Chapter 5: Case studies

The plan is, for version 5
- v0.5.0 goes live when the codes when the first case study is in the printbook, mapped to the notebook, and the codes are done

- Version v.0.5.1 Released when the second and final case study is done.

- Version v0.5.2 Codes/Book done and repo reorg mostly done. Notebook --> Printbook done and indexing the Notebook part is underway. 

- v0.5.3 is reserved for finalizing the print book <--> notebook mappings, cleaing up the docs, and fixing inconsitencies. I will post the package announcements for v0.5.3 on Discourse when 0.5.3 is done. __I will make no more announcemnts on Discourse after this until 1.0 comes out.__

- 0.5.z for z > 3 are preparatory releases for the announcement to NA-Digest. There may not be any of these. 

- 0.6.0 is the NA-Digest release. At that point the text should be in final(?) draft form, the solvers and examples should be done, and the writing should be in the final proofreading stage. 0.6.y for y>0 will be bug fixes, typo management, response to community complaints ...

- 0.7.0 is the version that goes to the copy editor. At this point interfaces, docstrings, and any codes copied into the book are frozen unless I find bugs.

- 0.8.0 is my respose to the copy editor's complaints. The book goes to the printer at this stage and nothing I say in the book about the orginization of the repos ... will change after this.

- 0.9.0 is a clean up release where I give the comment lines in the codes a last tweak.

v1.0.0 goes out __when the print book is published__. This means that after v1.0.0 the interface to the codes will always be consistent with the book. My readers get my __solemn word__ on that.

## Pull Requests

__I like bug reports; I need bug reports__, but ...

__Please, please__, do not send me PRs. If you find 
   1.  a bug (programming or performance) in the codes,
   2. confusion, lack of clarity, or __errors in the installation instructions__,
       1. I would __really like__ some Windows users to try this stuff, especially the notebooks.
   3. something I could do in the user interface to help you do your work ...
       1. that won't break other stuff, 
       2. make the code or __user interface__ opaque to a novice,
       3. or eat up lots of time,
   4. a factual error in the documentation/notebook, or 
   5. an error/inconsistency in the docstrings, please ...
  
 Do your choice of ... 

- tell me the old fashioned way with email to tim_kelley@ncsu.edu 
- or open an issue.

This is a book project and I need to put all changes in by hand so I'll have muscle memory about what's going on.

I have limited bandwidth, __so please do not send me email or open issues about__ ...

   0. Typos in the notebook or the docstrings. This project is far from the final proofreading stage and I want to fix those things in peace. There are many of them and I do not need 100s of emails/issues about that. If you like hunting typos, open season begins when I announce this project on NA-DIGEST.
   1. Julia programming style, with the exception of correctness and performance. I know this is not fully idiomatic Julia, am working on it, and getting better. As I said in the introduction, I have traded a lot of abstraction for clarity. That means clairity for the novice. 
      1. I am also an old guy and the final product will reflect the Fortran __66__ I was raised on. That's show biz. 
           1.  Fortran + Julia = __Foolia__
   2. Organization of the repo. I'm still thinking this through. The important thing is that it make sense for the print book. I must do this work with the publisher.
   3. Questions like "Why isn't Trotsky's method in here?" If you object to an algorithmic choice, you'll have to be content to know that I have thought about the algorithm mix pretty carefully, have a clear vision for this project, and understand this field fairly well. 
   4. Questions like "Why doesn't SIAMFANLEquations.jl look/work/smell like and/or use DasKapital.jl?" The reasons are that
      1. I am neither Karl nor Groucho,
      2. this project has a different mission, and 
      3. __I am working hard to limit depencencies__. 
   5. Philosophy, politics, opinions, invitations to debates, ...
 


## Core References and Documentation

The best documentation for this package will be the [notebook](https://github.com/ctkelley/NotebookSIAMFANL) and the print book. They will have detailed algorithmic descriptions, examples for you to play with, and guidance on tweaking the algorithmic paramenters to solve your problems. The notebook will be built in parallel with the print book and the content will be __roughly__ the same. The differences will be to accommodate the two formats. For example, docstrings need some work after the map from notebook to print and notebook has to make sense as an interactive resource.

I've also used [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) with this package. Click the badge
[![](https://img.shields.io/badge/docs-stable-blue.svg)](https://ctkelley.github.io/SIAMFANLEquations.jl/stable)
to get the documentation from the latest release. The documenter files have the headers for the solvers and some of the test problems. I continue to work on the docs and they will get better, but will never be as good as the notebook.

This book will not cover theory in detail (ie no proofs). My two books on nonlinear equations

(Kel95) C. T. Kelley, [***Iterative Methods for Linear and Nonlinear Equations***](https://my.siam.org/Store/Product/viewproduct/?ProductId=862) , Frontiers in Applied Mathematics 16,  SIAM 1995

and

(Kel03) C. T. Kelley, [***Solving Nonlinear Equations with Newton's Method***](https://my.siam.org/Store/Product/viewproduct/?ProductId=841) , Fundamentals of Algorithms 1, SIAM 2003

describe the classic Newton and Newton-Krylov algorithms. Kel95 has the theory. This project is a sequel to Kel03. Kel03 is Matlab-centric
and will remain in print.

A recent Acta Numerica paper has everything

(Kel18) C. T. Kelley, ***Numerical Methods for Nonlinear Equations***, Acta Numerica 27 (2018), pp 207--287. https://doi.org/10.1017/S0962492917000113

The references I use for theory of pseudo-transient continuation and Anderson acceleration are

(KK98) C. T. Kelley and D. E. Keyes, ***Convergence Analysis of Pseudo-Transient Continuation***, SIAM Journal on Numerical Analysis 35 (1998), pp 508-523. https://doi.org/10.1137/S0036142996304796

(TK15) A. Toth and C. T. Kelley, ***Convergence Analysis for Anderson Acceleration***, SIAM Journal on Numerical Analysis 53, (2015), pp 805-819. https://doi.org/10.1137/130919398

## Algorithms and Solvers

The solvers are designed to be stand-alone codes. The reason for this is the education mission of the project. I want the codes to be as easy to understand as possible. I have deliberately sacrificed a lot of abstraction and some performance in this effort. The reward for the reader (ie you) is that the algorithmic parameters are completely exposed so  you can play with them. At the end I may write a wrapper for all this that hides the parameters as a separate package. However, the stand-alone, keyword-infested codes are what you need if you want to really understand how these methods work. My students became experts in this field by fiddling with the Matlab version of these solvers.

The linear solvers are tuned to communicate well with nonlinear solvers. My old Matlab codes are a good illustration of this idea. My [new Mablab codes](https://ctk.math.ncsu.edu/knl.html) were designed in response to the need to do this better than I had been. In particular, the linear solver and the matrix-vector/preconditioner-vector product function need information on the nonlinear iteration and any precomputed data. While I could use global variables (and did in Kel95) and put these things in a module to simplify the interface, I won't do that anymore. Global varaibles make debugging harder and break parallelism. I like to avoid them. 

The algorithms, listed by book chapter will be

   - Chapter 1: Newton-Armijo and Pseudo-transient continuation for scalar equations: nsolsc.jl and ptcsolsc.jl
        - Codes: __Done!__, Notebook: __Done!__
   - Chapter 2: Newton-Armijo and Pseudo-transient continuation for systems with direct linear solvers: nsol.jl and ptcsol.jl
        - Codes: __Done!__, Notebook: __Done!__
   - Chapter 3: Newton-Armijo and Pseudo-transient continuation for systems with iterative linear solvers: nsoli.jl and ptcsoli.jl
       - Codes: __Done!__, Notebook: __Done!__
   - Chapter 4: Anderson acceleration: aasol.jl 
        - Codes: __Done!__, Notebook: __Done!__
   - Chapter 5: Case studies: __Conductive-Radiative heat transfer close to done. When done, it's time for 0.5.0.__
   
   
## Test Problems

You'll need the TestProblems and examples submodules to run the notebook. To get those type 

```using SIAMFANLEquations.TestProblems```

and 

```using SIAMFANLEquations.Examples``` 

in the REPL or run the first code cell in the notebook 

```include("fanote_init.jl")```

There are two kinds of test problems. The ones you care about are the ones that I use in the print book and notebook to demonstrate the algorithms. The "inside baseball" problems are the ones I __only__ use for CI. They only appear in the /test directory. If you don't know or care about what CI is, be happy.

## Citations 
Cite the package, print book and notebook like this. 
```
@misc{ctk:siamfanl,
title="{SIAMFANLEquations.jl}",
author="C. T. Kelley",
year=2022,
note="Julia Package",
doi="10.5281/zenodo.4284807",
url="https://github.com/ctkelley/SIAMFANLEquations.jl"
}

@misc{ctk:fajulia,
author="C. T. Kelley",
title="{Solving Nonlinear Equations with Iterative Methods:
Solvers and Examples in Julia}",
year=2022,
note="Unpublished book ms, under contract with SIAM"
}

@misc{ctk:notebooknl,
title="{Notebook for Solving Nonlinear Equations with Iterative Methods:
Solvers and Examples in Julia}",
author="C. T. Kelley",
year=2022,
note="IJulia Notebook",
url="https://github.com/ctkelley/NotebookSIAMFANL",
doi="10.5281/zenodo.4284687"
}
```

## Changes

### Updates since 0.4.3

- v0.5.0: (This release) Conductive-Radiative case study done.

### Chapter 5 will be short
      

### What's after 0.5.x?

- 0.6.0 is the version I'll announce on NA-Digest, expect 0.5.x for x=0, ..., before this happens.
- 0.7.0 is the version that goes to the publisher.
- 0.8.0 is the version where I fix the problems the copy editors find. __This is the version that goes to the printer.__
- 0.9.0 is the final tweaking of the codes, test problems, and examples. Nothing visible can change at this point. I can cleanup internal documentation for the codes, fix bugs, and tune the README.md files for repositories. 
- 1.0.0 is the end. 

   
## Funding

This project was partially supported by
1. Army Research Office grant W911NF-16-1-0504
2. National Science Foundation Grants
   1. OAC-1740309
   2. DMS-1745654
   3. DMS-1906446
3. Department of Energy grant DE-NA003967
   
Any opinions, findings, and conclusions or
recommendations expressed in this material are those of the author and
do not necessarily reflect the views of the National
Science Foundation, the Department of Energy,
or the Army Research Office.

[docs-dev-img]: https://img.shields.io/badge/docs-dev-blue.svg
[docs-dev-url]: https://ctkelley.github.io/SIAMFANLEquations.jl/dev

[docs-stable-img]: https://img.shields.io/badge/docs-stable-blue.svg
[docs-stable-url]: https://ctkelley.github.io/SIAMFANLEquations.jl/stable

[build-status-img]: https://github.com/ctkelley/SIAMFANLEquations.jl/workflows/CI/badge.svg
[build-status-url]: https://github.com/ctkelley/SIAMFANLEquations.jl/actions

[codecov-img]: https://codecov.io/gh/ctkelley/SIAMFANLEquations.jl/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/ctkelley/SIAMFANLEquations.jl



