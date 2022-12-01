// SPDX-License-Identifier: MIT
export default function BlueprintQualitySummaryBar(props: {
	primitiveCount?: number,
	ramshackleCount?: number,
	apprenticeCount?: number,
	journeymanCount?: number,
	mastercraftCount?: number,
	ascendantCount?: number
}) {
	return (
		<div className="row">
			<div className="col-sm-6 col-md-4 col-xl-2 mb-3">
				<div className="card">
					<div className="card-body">
						Primitive

						<span className="badge bg-secondary float-end">{props.primitiveCount ?? 0}</span>
					</div>
				</div>
			</div>
			<div className="col-sm-6 col-md-4 col-xl-2 mb-3">
				<div className="card">
					<div className="card-body">
						Ramshackle

						<span className="badge bg-secondary float-end">{props.ramshackleCount ?? 0}</span>
					</div>
				</div>
			</div>
			<div className="col-sm-6 col-md-4 col-xl-2 mb-3">
				<div className="card">
					<div className="card-body">
						Apprentice

						<span className="badge bg-secondary float-end">{props.apprenticeCount ?? 0}</span>
					</div>
				</div>
			</div>
			<div className="col-sm-6 col-md-4 col-xl-2 mb-3">
				<div className="card">
					<div className="card-body">
						Journeyman

						<span className="badge bg-secondary float-end">{props.journeymanCount ?? 0}</span>
					</div>
				</div>
			</div>
			<div className="col-sm-6 col-md-4 col-xl-2 mb-3">
				<div className="card">
					<div className="card-body">
						Mastercraft

						<span className="badge bg-secondary float-end">{props.mastercraftCount ?? 0}</span>
					</div>
				</div>
			</div>
			<div className="col-sm-6 col-md-4 col-xl-2 mb-3">
				<div className="card">
					<div className="card-body">
						Ascendant

						<span className="badge bg-secondary float-end">{props.ascendantCount ?? 0}</span>
					</div>
				</div>
			</div>
		</div>
	);
}