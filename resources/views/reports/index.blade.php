<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reports Dashboard - E-Tiko</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        .report-card {
            transition: transform 0.2s;
            border: none;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .report-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .report-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        .btn-download {
            margin: 0.25rem;
        }
    </style>
</head>
<body class="bg-light">
    <div class="container py-5">
        <div class="row">
            <div class="col-12">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h1 class="h3 mb-0">
                        <i class="fas fa-chart-bar text-primary me-2"></i>
                        Reports Dashboard
                    </h1>
                    <a href="{{ route('dashboard') }}" class="btn btn-outline-secondary">
                        <i class="fas fa-arrow-left me-1"></i>
                        Back to Dashboard
                    </a>
                </div>
            </div>
        </div>

        <div class="row">
            <!-- Users Report Card -->
            <div class="col-md-4 mb-4">
                <div class="card report-card h-100">
                    <div class="card-body text-center">
                        <div class="report-icon text-primary">
                            <i class="fas fa-users"></i>
                        </div>
                        <h5 class="card-title">Users Report</h5>
                        <p class="card-text text-muted">
                            Generate comprehensive reports on user registrations, roles, and 2FA status.
                        </p>
                        <div class="d-grid gap-2">
                            <a href="{{ route('reports.users.pdf') }}" class="btn btn-primary btn-download">
                                <i class="fas fa-file-pdf me-1"></i>
                                Download PDF
                            </a>
                            <a href="{{ route('reports.users.excel') }}" class="btn btn-success btn-download">
                                <i class="fas fa-file-excel me-1"></i>
                                Download Excel
                            </a>
                            <a href="{{ route('reports.users.csv') }}" class="btn btn-info btn-download">
                                <i class="fas fa-file-csv me-1"></i>
                                Download CSV
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bookings Report Card -->
            <div class="col-md-4 mb-4">
                <div class="card report-card h-100">
                    <div class="card-body text-center">
                        <div class="report-icon text-success">
                            <i class="fas fa-ticket-alt"></i>
                        </div>
                        <h5 class="card-title">Bookings Report</h5>
                        <p class="card-text text-muted">
                            View detailed booking information, ticket types, and payment status.
                        </p>
                        <div class="d-grid gap-2">
                            <a href="{{ route('reports.bookings.pdf') }}" class="btn btn-primary btn-download">
                                <i class="fas fa-file-pdf me-1"></i>
                                Download PDF
                            </a>
                            <a href="{{ route('reports.bookings.excel') }}" class="btn btn-success btn-download">
                                <i class="fas fa-file-excel me-1"></i>
                                Download Excel
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Revenue Report Card -->
            <div class="col-md-4 mb-4">
                <div class="card report-card h-100">
                    <div class="card-body text-center">
                        <div class="report-icon text-warning">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <h5 class="card-title">Revenue Report</h5>
                        <p class="card-text text-muted">
                            Analyze revenue trends, monthly breakdowns, and financial performance.
                        </p>
                        <div class="d-grid gap-2">
                            <a href="{{ route('reports.revenue.pdf') }}" class="btn btn-primary btn-download">
                                <i class="fas fa-file-pdf me-1"></i>
                                Download PDF
                            </a>
                            <a href="{{ route('reports.revenue.excel') }}" class="btn btn-success btn-download">
                                <i class="fas fa-file-excel me-1"></i>
                                Download Excel
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Additional Information -->
        <div class="row mt-5">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0">
                            <i class="fas fa-info-circle text-info me-2"></i>
                            Report Information
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Available Formats:</h6>
                                <ul class="list-unstyled">
                                    <li><i class="fas fa-file-pdf text-danger me-2"></i>PDF - Professional formatted reports</li>
                                    <li><i class="fas fa-file-excel text-success me-2"></i>Excel - Data analysis and manipulation</li>
                                    <li><i class="fas fa-file-csv text-info me-2"></i>CSV - Raw data export</li>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <h6>Report Features:</h6>
                                <ul class="list-unstyled">
                                    <li><i class="fas fa-check text-success me-2"></i>Real-time data generation</li>
                                    <li><i class="fas fa-check text-success me-2"></i>Professional formatting</li>
                                    <li><i class="fas fa-check text-success me-2"></i>Timestamped filenames</li>
                                    <li><i class="fas fa-check text-success me-2"></i>Role-based access control</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
