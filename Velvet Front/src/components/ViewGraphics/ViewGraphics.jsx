// ViewGraphics.js
import { NavBar } from '../NavBar/NavBar';
import './ViewGraphics.css';
import { Link } from 'react-router-dom';

export const ViewGraphics = () => {
    return (
        <>
        <NavBar />
        <div className="container mt-5 justify-content-center text-center">
            <div className="row">
                <div className="col-md-6 col-lg-4 mb-3">
                    <div className="card mx-3">
                        <img src="https://www.get-digital-help.com/wp-content/uploads/2018/09/How-to-create-an-area-chart.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Gráfica de Área</h5>
                            <Link to={'/graficaArea'}>
                                <a href="" className="btn btn-primary ">Ver Gráfica</a>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-4 mb-3">
                    <div className="card mx-3">
                        <img src="https://bookdown.org/jboscomendoza/r-principiantes4/r-principiantes_files/figure-html/bar_col-1.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Gráfica de Barras</h5>
                            <Link to={'/graficaBarras'}>
                                <a href="" className="btn btn-primary ">Ver Gráfica</a>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-4 mb-3">
                    <div className="card mx-3">
                        <img src="https://images.edrawmax.com/images/knowledge/line-graph-1-what-is.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Gráfica de Línea</h5>
                            <Link to={'/graficaLinea'}>
                                <a href="" className="btn btn-primary ">Ver Gráfica</a>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-4">
                    <div className="card mx-3">
                        <img src="https://www.ichartcool.com/img/FnymBx8U1aMRpN-PJnBDNF20v8-9.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Gráfica de Pastel</h5>
                            <Link to={'/graficaPastel'}>
                                <a href="" className="btn btn-primary ">Ver Gráfica</a>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-4">
                    <div className="card mx-3">
                        <img src="https://images.edrawsoft.com/articles/radar-chart/radar-chart-1.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Gráfica de Radar</h5>
                            <Link to={'/graficaRadar'}>
                                <a href="" className="btn btn-primary ">Ver Gráfica</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
