"use client";
import axios from "axios";
import "./secondSection.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function SecondSectionOfHeader() {



    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Function to handle form submission
    const onSubmit = (data) => {
        console.log(data);
        let formData = new FormData();
        formData.append("watchName", data.watchName)
        formData.append("watchPrice", data.watchPrice)
        formData.append("watchCategory", data.watchCategory)
        formData.append("watchDesc", data.watchDesc)
        formData.append("features", data.features)
        formData.append("file", data.file[0]);
        axios.post("api/watchapi", formData).then(function (resp) {
            console.log(resp.data);
            toast.success("data save successfull");
        })


    };
    return (
        <div >
            <div style={{ borderBottom: "1px solid red" }}>
                {/* Show this section only on screens larger than medium */}
                <div className="  d-flex justify-content-center justify-content-md-between" style={{ lineHeight: "35px", width: "95%", margin: "auto" }}>
                    <div className="d-md-flex  d-none flex-wrap">
                        <div className="me-4">
                            <small>Our Story</small>
                        </div>
                        <div className="me-4">
                            <small>Store Locator</small>
                        </div>
                        <div className="me-4">
                            <small>U.A.E Office</small>
                        </div>
                        <div className="me-4">Globals OutLets</div>
                    </div>
                    <div className="d-flex flex-wrap">
                        <div className="me-4"><small>0213-828-2828</small></div>
                        <div className="me-4">+46-737-359989</div>
                        <div className="me-4  d-md-flex  d-none " ><small>30-Days Easy Refund & Exchange</small></div>
                        <div className="me-4 d-md-block d-none">Number</div>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            add watch
                        </button>
                    </div>
                </div>
            </div>

            <div className="headerone" style={{ width: "95%", margin: "auto" }}>
                <nav className="navbar navbar-expand-md ">
                    <div className="container-fluid d-md-flex align-items-center justify-content-between">
                        <a className="navbar-brand flex-grow-1 " href="#">
                            <div className="d-flex justify-content-center">
                                <img src="logo.png" className="me-3" alt="logo" />
                                <div>
                                    <small>
                                        46 years in <br /> watchmaking
                                    </small>
                                </div>
                            </div>
                        </a>

                        {/* Search bar and card in a flex container */}
                        <div className="d-flex flex-grow-1 mx-md-5"  >
                            <input type="search" className="form-control me-2" placeholder="Search..." />
                            {/* <div>card</div> */}
                        </div>


                        {/* Navbar toggle button */}
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse flex-grow-1" id="navbarSupportedContent">
                            {/* Show this section only on screens smaller than medium (inside the collapsed menu) */}
                            <div className="d-md-none d-block flex-wrap ">
                                <div className="me-4">
                                    <small>Our Story</small>
                                </div>
                                <div className="me-4">
                                    <small>Store Locator</small>
                                </div>
                                <div className="me-4">
                                    <small>U.A.E Office</small>
                                </div>
                                <div className="me-4">Globals OutLets</div>
                            </div>

                            <ul className="navbar-nav d-flex  flex-grow-1 justify-content-center align-items-md-center me-auto mb-2 mb-lg-0" style={{ fontSize: "25px" }}>
                                <li className="nav-item me-2">

                                    <i class="fa-brands fa-square-facebook"></i>

                                </li>

                                <li className="nav-item me-2">
                                    <a className="nav-link" href="#">
                                        <i class="fa-brands fa-instagram"></i>
                                    </a>
                                </li>
                                <li className="nav-item me-2">

                                    <i class="fa-brands fa-youtube"></i>

                                </li>
                                <li className="nav-item me-2">

                                    <i class="fa-brands fa-github"></i>

                                </li>
                                <li className="nav-item me-2">

                                    <i class="fa-brands fa-snapchat"></i>

                                </li>
                                <li className="nav-item">

                                    <i class="fa-brands fa-tiktok"></i>

                                </li>
                            </ul>
                        </div>
                    </div>

                </nav>
            </div>
            <div>
                <div>
                    <img src="fad.webp"></img>
                </div>
                <div>

                    {/* <!-- Button trigger modal --> */}


                    {/* <!-- Modal --> */}
                    <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                                        Add watch
                                    </h1>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    {/* Use handleSubmit to handle form submission */}
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            Watch Name:{" "}
                                            <input
                                                type="text"
                                                className="form-control"
                                                {...register("watchName", { required: "Watch Name is required" })}
                                            />
                                            {errors.watchName && (
                                                <p className="text-danger">{errors.watchName.message}</p>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            Watch Price:{" "}
                                            <input
                                                type="number"
                                                className="form-control"
                                                {...register("watchPrice", {
                                                    required: "Watch Price is required",
                                                    min: { value: 1, message: "Price must be at least $1" },
                                                })}
                                            />
                                            {errors.watchPrice && (
                                                <p className="text-danger">{errors.watchPrice.message}</p>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            Watch Description:{" "}
                                            <input
                                                type="text"
                                                className="form-control"
                                                {...register("watchDesc", { required: "Watch Description is required" })}
                                            />
                                            {errors.watchDesc && (
                                                <p className="text-danger">{errors.watchDesc.message}</p>
                                            )}
                                        </div>
                                        {/* 
                                        <div className="mb-3">
                                            Watch Category:{" "}
                                              
                                            <input
                                                type="text"
                                                className="form-control"
                                                {...register("watchCategory", {
                                                    required: "Watch Category is required",
                                                })}
                                            />
                                            {errors.watchCategory && (
                                                <p className="text-danger">{errors.watchCategory.message}</p>
                                            )}
                                        </div> */}
                                        <div className="mb-3">
                                        Watch Category:{" "}
                                            <div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        {...register("watchCategory")}
                                                        value="Smart Watch"
                                                    />
                                                    <label className="form-check-label">Smart Watch</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        {...register("watchCategory")}
                                                        value="Time Of happiness"
                                                    />
                                                    <label className="form-check-label">Time Of happiness</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        {...register("watchCategory")}
                                                        value="Men Formal"
                                                    />
                                                    <label className="form-check-label">Men Formal</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        {...register("watchCategory")}
                                                        value="Female Watches"
                                                    />
                                                    <label className="form-check-label">Female Watches</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        {...register("watchCategory")}
                                                        value="Sport Collection"
                                                    />
                                                    <label className="form-check-label">Sport Collection</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        {...register("watchCategory")}
                                                        value="Couple Watches"
                                                    />
                                                    <label className="form-check-label">Couple Watches</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        {...register("watchCategory")}
                                                        value="Best Selling"
                                                    />
                                                    <label className="form-check-label">Best Selling</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        {...register("watchCategory")}
                                                        value="Limited Stock"
                                                    />
                                                    <label className="form-check-label">Limited Stock</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        {...register("watchCategory")}
                                                        value="Round Dail"
                                                    />
                                                    <label className="form-check-label">Round Dail</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        {...register("watchCategory")}
                                                        value="Leather Watch"
                                                    />
                                                    <label className="form-check-label">Leather Watch</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        {...register("watchCategory")}
                                                        value="Stellness Stail"
                                                    />
                                                    <label className="form-check-label">Stellness Stail</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            Watch Image:{" "}
                                            <input
                                                type="file"
                                                className="form-control"
                                                {...register("file", {
                                                    required: "Watch Image is required",
                                                })}
                                            />
                                            {errors.watchImage && (
                                                <p className="text-danger">{errors.file.message}</p>
                                            )}
                                        </div>

                                        {/* Features Field: Adding checkboxes for features */}
                                        <div className="mb-3">
                                            Features:{" "}
                                            <div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        {...register("features")}
                                                        value="Water-resistant"
                                                    />
                                                    <label className="form-check-label">Water-resistant</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        {...register("features")}
                                                        value="Chronograph"
                                                    />
                                                    <label className="form-check-label">Chronograph</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        {...register("features")}
                                                        value="Scratch-resistant glass"
                                                    />
                                                    <label className="form-check-label">Scratch-resistant glass</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        {...register("features")}
                                                        value="GPS"
                                                    />
                                                    <label className="form-check-label">GPS</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-bs-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                            <button type="submit" className="btn btn-primary">
                                                Save changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
