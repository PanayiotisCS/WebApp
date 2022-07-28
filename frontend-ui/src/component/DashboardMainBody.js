import React from "react";

const DashboardMainBody = () => {
    return (
        <div>

            <h2>Section title</h2>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Header</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1,001</td>
                    <td>random</td>
                    <td>data</td>

                    </tr>
                    <tr>
                    <td>1,002</td>
                    <td>placeholder</td>
                    <td>irrelevant</td>

                    </tr>
                    <tr>
                    <td>1,003</td>
                    <td>data</td>
                    <td>rich</td>

                    </tr>
                    <tr>
                    <td>1,003</td>
                    <td>information</td>
                    <td>placeholder</td>

                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    );
}

export default DashboardMainBody;