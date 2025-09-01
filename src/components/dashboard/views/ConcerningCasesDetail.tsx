import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertTriangle, 
  Eye, 
  CreditCard, 
  Phone,
  Mail,
  Calendar,
  DollarSign,
  TrendingDown
} from "lucide-react";

interface ConcerningCase {
  policyNumber: string;
  branchCode: string;
  region: string;
  productName: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  dueDays: number;
  rpDues: number;
  claimCount: number;
  withdrawalCount: number;
  lastContact: string;
  riskScore: number;
  concernReasons: string[];
  recommendedActions: string[];
}

const mockConcerningCases: ConcerningCase[] = [
  {
    policyNumber: "POL001234",
    branchCode: "BR001",
    region: "North",
    productName: "Term Life",
    customerName: "Rajesh Kumar",
    customerPhone: "+91-9876543210",
    customerEmail: "rajesh.kumar@email.com",
    dueDays: 45,
    rpDues: 25000,
    claimCount: 1,
    withdrawalCount: 0,
    lastContact: "2024-07-15",
    riskScore: 85,
    concernReasons: ["High claim activity", "45 days overdue", "No recent payment"],
    recommendedActions: ["Immediate follow-up", "Offer payment plan", "Review claim status"]
  },
  {
    policyNumber: "POL005678",
    branchCode: "BR003",
    region: "East",
    productName: "ULIP",
    customerName: "Priya Singh",
    customerPhone: "+91-8765432109",
    customerEmail: "priya.singh@email.com",
    dueDays: 32,
    rpDues: 18500,
    claimCount: 0,
    withdrawalCount: 2,
    lastContact: "2024-07-20",
    riskScore: 72,
    concernReasons: ["Multiple withdrawals", "32 days overdue", "Decreasing policy value"],
    recommendedActions: ["Schedule meeting", "Explain policy benefits", "Offer top-up options"]
  },
  {
    policyNumber: "POL009012",
    branchCode: "BR002",
    region: "South",
    productName: "Whole Life",
    customerName: "Amit Patel",
    customerPhone: "+91-7654321098",
    customerEmail: "amit.patel@email.com",
    dueDays: 67,
    rpDues: 35000,
    claimCount: 2,
    withdrawalCount: 1,
    lastContact: "2024-06-30",
    riskScore: 92,
    concernReasons: ["Multiple claims", "67 days overdue", "No contact response", "High premium amount"],
    recommendedActions: ["Escalate to manager", "Legal notice preparation", "Offer settlement options"]
  }
];

export function ConcerningCasesDetail() {
  const [selectedCase, setSelectedCase] = useState<ConcerningCase | null>(null);

  const getRiskBadgeColor = (score: number) => {
    if (score >= 80) return "destructive";
    if (score >= 60) return "secondary";
    return "default";
  };

  const getRiskLabel = (score: number) => {
    if (score >= 80) return "High Risk";
    if (score >= 60) return "Medium Risk";
    return "Low Risk";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Concerning Cases Analysis</h2>
          <p className="text-muted-foreground">
            Detailed view of high-risk policies requiring immediate attention
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="destructive" className="px-3 py-1">
            <AlertTriangle className="w-4 h-4 mr-1" />
            {mockConcerningCases.length} Critical Cases
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cases Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                High-Risk Policy Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Policy</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Due Amount</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockConcerningCases.map((case_) => (
                    <TableRow 
                      key={case_.policyNumber}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedCase(case_)}
                    >
                      <TableCell>
                        <div>
                          <div className="font-medium">{case_.policyNumber}</div>
                          <div className="text-sm text-muted-foreground">
                            {case_.branchCode} • {case_.region}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{case_.customerName}</div>
                          <div className="text-sm text-muted-foreground">
                            {case_.dueDays} days overdue
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{case_.productName}</TableCell>
                      <TableCell>
                        <div className="font-medium text-destructive">
                          ₹{case_.rpDues.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRiskBadgeColor(case_.riskScore)}>
                          {case_.riskScore} - {getRiskLabel(case_.riskScore)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Case Details Sidebar */}
        <div>
          {selectedCase ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Case Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Policy Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Policy:</span>
                      <span className="font-medium">{selectedCase.policyNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Product:</span>
                      <span>{selectedCase.productName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Branch:</span>
                      <span>{selectedCase.branchCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Region:</span>
                      <span>{selectedCase.region}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Customer Contact</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedCase.customerPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="truncate">{selectedCase.customerEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Last contact: {selectedCase.lastContact}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Financial Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-destructive" />
                      <span>Due: ₹{selectedCase.rpDues.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedCase.dueDays} days overdue</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Concern Reasons</h4>
                  <div className="space-y-1">
                    {selectedCase.concernReasons.map((reason, index) => (
                      <Badge key={index} variant="secondary" className="text-xs mr-1 mb-1">
                        {reason}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Recommended Actions</h4>
                  <div className="space-y-2">
                    {selectedCase.recommendedActions.map((action, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button className="w-full" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Initiate Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Select a case to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}