'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Coins,
  Zap,
  Crown,
  TrendingUp,
  Check,
  Gift,
  Clock,
  Users,
  Star,
  Sparkles,
  ChevronRight,
  Shield,
  Percent,
  Calculator,
  ArrowRight,
  Info,
} from 'lucide-react';

// Game Theory Pricing Tiers with psychological anchoring
const creditPackages = [
  {
    id: 'starter',
    name: 'Starter',
    credits: 5000,
    price: 50,
    pricePerCredit: 0.01,
    savings: 0,
    savingsPercent: 0,
    bonus: 0,
    icon: Coins,
    color: '#706f69',
    popular: false,
    features: ['Basic account enrichment', 'Standard signals'],
    description: 'Perfect for trying out',
  },
  {
    id: 'growth',
    name: 'Growth',
    credits: 25000,
    price: 200,
    pricePerCredit: 0.008,
    savings: 50,
    savingsPercent: 20,
    bonus: 2500,
    icon: TrendingUp,
    color: '#1c64f2',
    popular: true,
    features: ['All Starter features', 'AI Discovery (50 accounts)', 'Priority support'],
    description: 'Most value for growing teams',
    badge: 'MOST POPULAR',
  },
  {
    id: 'scale',
    name: 'Scale',
    credits: 50000,
    price: 350,
    pricePerCredit: 0.007,
    savings: 150,
    savingsPercent: 30,
    bonus: 7500,
    icon: Zap,
    color: '#10b981',
    popular: false,
    features: ['All Growth features', 'AI Discovery (150 accounts)', 'Dedicated success manager'],
    description: 'Best for scaling teams',
    badge: 'BEST VALUE',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    credits: 100000,
    price: 600,
    pricePerCredit: 0.006,
    savings: 400,
    savingsPercent: 40,
    bonus: 20000,
    icon: Crown,
    color: '#f59e0b',
    popular: false,
    features: ['All Scale features', 'Unlimited AI Discovery', 'Custom integrations', 'SLA guarantee'],
    description: 'For large organizations',
    badge: 'MAX SAVINGS',
  },
];

// Social proof data
const socialProof = {
  activeUsers: '2,847',
  avgPurchase: 'Growth',
  lastPurchase: '3 min ago',
  satisfaction: 98,
};

// What credits unlock (Loss Aversion)
const creditUseCases = [
  { action: 'Enrich 1 account', credits: 5, icon: Users },
  { action: 'AI Discovery (10 accounts)', credits: 20, icon: Sparkles },
  { action: 'Generate signal alerts', credits: 10, icon: Zap },
  { action: 'Export to CRM', credits: 2, icon: ArrowRight },
];

export default function CreditRechargePage() {
  const [selectedPackage, setSelectedPackage] = useState<string>('growth');
  const [showCustom, setShowCustom] = useState(false);
  const [customCredits, setCustomCredits] = useState(10000);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Current user's balance (mock)
  const currentBalance = 3500;

  const selectedPkg = creditPackages.find(p => p.id === selectedPackage);

  // Custom pricing calculator with tiered rates
  const calculateCustomPrice = (credits: number) => {
    let rate = 0.01;
    let savings = 0;

    if (credits >= 75000) {
      rate = 0.006;
      savings = credits * (0.01 - 0.006);
    } else if (credits >= 40000) {
      rate = 0.007;
      savings = credits * (0.01 - 0.007);
    } else if (credits >= 15000) {
      rate = 0.008;
      savings = credits * (0.01 - 0.008);
    }

    return {
      price: Math.ceil(credits * rate),
      rate,
      savings: Math.floor(savings),
      savingsPercent: Math.round((1 - rate / 0.01) * 100),
    };
  };

  const customPricing = calculateCustomPrice(customCredits);

  const handlePurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 2000);
  };

  if (showSuccess) {
    const pkg = selectedPkg || { credits: customCredits, bonus: 0, name: 'Custom' };
    const totalCredits = pkg.credits + (pkg.bonus || 0);

    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f3f5f5' }}>
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl" style={{ borderColor: '#e7e7e6' }}>
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#ecfdf5' }}>
            <Check size={32} style={{ color: '#10b981' }} />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: '#111928' }}>Payment Successful!</h2>
          <p className="text-sm mb-6" style={{ color: '#706f69' }}>
            {totalCredits.toLocaleString()} credits have been added to your account
          </p>

          <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: '#f3f5f5' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs" style={{ color: '#706f69' }}>Previous Balance</span>
              <span className="text-sm font-medium" style={{ color: '#464544' }}>{currentBalance.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs" style={{ color: '#706f69' }}>Credits Added</span>
              <span className="text-sm font-medium" style={{ color: '#10b981' }}>+{totalCredits.toLocaleString()}</span>
            </div>
            <div className="h-px my-2" style={{ backgroundColor: '#e7e7e6' }} />
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold" style={{ color: '#111928' }}>New Balance</span>
              <span className="text-lg font-bold" style={{ color: '#1c64f2' }}>{(currentBalance + totalCredits).toLocaleString()}</span>
            </div>
          </div>

          <Link
            href="/database-search/accounts"
            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#1c64f2' }}
          >
            Start Using Credits
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f3f5f5' }}>
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10" style={{ borderColor: '#e7e7e6' }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/database-search/accounts" className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowLeft size={18} style={{ color: '#464544' }} />
            </Link>
            <div>
              <h1 className="text-sm font-bold" style={{ color: '#111928' }}>Recharge Credits</h1>
              <p className="text-xs" style={{ color: '#706f69' }}>Choose a plan that fits your needs</p>
            </div>
          </div>

          {/* Current Balance - Loss Aversion trigger */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: currentBalance < 1000 ? '#fef2f2' : '#f3f5f5' }}>
            <Coins size={14} style={{ color: currentBalance < 1000 ? '#ef4444' : '#706f69' }} />
            <span className="text-xs" style={{ color: '#706f69' }}>Current Balance:</span>
            <span className="text-sm font-bold" style={{ color: currentBalance < 1000 ? '#ef4444' : '#111928' }}>
              {currentBalance.toLocaleString()}
            </span>
            {currentBalance < 1000 && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: '#fecaca', color: '#ef4444' }}>
                LOW
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Social Proof Bar - Bandwagon Effect */}
        <div className="bg-white rounded-xl p-3 mb-6 flex items-center justify-between" style={{ borderColor: '#e7e7e6', border: '1px solid #e7e7e6' }}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Users size={14} style={{ color: '#1c64f2' }} />
              <span className="text-xs" style={{ color: '#706f69' }}>
                <span className="font-semibold" style={{ color: '#111928' }}>{socialProof.activeUsers}</span> teams trust Sprouts
              </span>
            </div>
            <div className="h-4 w-px" style={{ backgroundColor: '#e7e7e6' }} />
            <div className="flex items-center gap-2">
              <TrendingUp size={14} style={{ color: '#10b981' }} />
              <span className="text-xs" style={{ color: '#706f69' }}>
                Most teams choose <span className="font-semibold" style={{ color: '#10b981' }}>{socialProof.avgPurchase}</span>
              </span>
            </div>
            <div className="h-4 w-px" style={{ backgroundColor: '#e7e7e6' }} />
            <div className="flex items-center gap-2">
              <Clock size={14} style={{ color: '#f59e0b' }} />
              <span className="text-xs" style={{ color: '#706f69' }}>
                Last purchase <span className="font-semibold" style={{ color: '#111928' }}>{socialProof.lastPurchase}</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: '#ecfdf5' }}>
            <Star size={12} style={{ color: '#10b981' }} fill="#10b981" />
            <span className="text-xs font-semibold" style={{ color: '#10b981' }}>{socialProof.satisfaction}% satisfaction</span>
          </div>
        </div>

        {/* Limited Time Offer - Urgency */}
        <div
          className="rounded-xl p-3 mb-6 flex items-center justify-between"
          style={{
            background: 'linear-gradient(135deg, #0e2933 0%, #1c64f2 100%)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              <Gift size={18} className="text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Limited Time: Get up to 20% bonus credits!</p>
              <p className="text-white/70 text-xs">Purchase Growth or higher and receive bonus credits instantly</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            <Clock size={14} className="text-white" />
            <span className="text-white text-xs font-semibold">Ends in 2d 14h</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Package Selection - Left Side */}
          <div className="col-span-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold" style={{ color: '#111928' }}>Select a Package</h2>
              <button
                onClick={() => setShowCustom(!showCustom)}
                className="text-xs font-medium flex items-center gap-1 hover:underline"
                style={{ color: '#1c64f2' }}
              >
                <Calculator size={12} />
                {showCustom ? 'View packages' : 'Custom amount'}
              </button>
            </div>

            {!showCustom ? (
              <div className="grid grid-cols-2 gap-3">
                {creditPackages.map((pkg) => {
                  const isSelected = selectedPackage === pkg.id;
                  const Icon = pkg.icon;

                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className="relative bg-white rounded-xl p-4 cursor-pointer transition-all"
                      style={{
                        border: isSelected ? `2px solid ${pkg.color}` : '2px solid #e7e7e6',
                        boxShadow: isSelected ? `0 4px 12px ${pkg.color}20` : '0 1px 3px rgba(0,0,0,0.05)',
                      }}
                    >
                      {/* Badge */}
                      {pkg.badge && (
                        <div
                          className="absolute -top-2.5 left-4 px-2 py-0.5 text-[10px] font-bold rounded-full text-white"
                          style={{ backgroundColor: pkg.color }}
                        >
                          {pkg.badge}
                        </div>
                      )}

                      {/* Selection indicator */}
                      <div
                        className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: isSelected ? pkg.color : '#f3f5f5',
                          border: isSelected ? 'none' : '2px solid #e7e7e6'
                        }}
                      >
                        {isSelected && <Check size={12} className="text-white" />}
                      </div>

                      {/* Icon & Name */}
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${pkg.color}15`, color: pkg.color }}
                        >
                          <Icon size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-bold" style={{ color: '#111928' }}>{pkg.name}</p>
                          <p className="text-[10px]" style={{ color: '#706f69' }}>{pkg.description}</p>
                        </div>
                      </div>

                      {/* Credits */}
                      <div className="mb-3">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-bold" style={{ color: '#111928' }}>
                            {pkg.credits.toLocaleString()}
                          </span>
                          <span className="text-xs" style={{ color: '#706f69' }}>credits</span>
                        </div>
                        {pkg.bonus > 0 && (
                          <div className="flex items-center gap-1 mt-1">
                            <Gift size={10} style={{ color: '#10b981' }} />
                            <span className="text-[10px] font-semibold" style={{ color: '#10b981' }}>
                              +{pkg.bonus.toLocaleString()} bonus credits
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Price */}
                      <div className="flex items-end justify-between mb-3">
                        <div>
                          <span className="text-lg font-bold" style={{ color: pkg.color }}>${pkg.price}</span>
                          <span className="text-xs ml-1" style={{ color: '#706f69' }}>USD</span>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px]" style={{ color: '#706f69' }}>${pkg.pricePerCredit}/credit</p>
                          {pkg.savingsPercent > 0 && (
                            <p className="text-[10px] font-semibold" style={{ color: '#10b981' }}>
                              Save {pkg.savingsPercent}%
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="pt-3" style={{ borderTop: '1px solid #f3f5f5' }}>
                        {pkg.features.slice(0, 2).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 mb-1">
                            <Check size={10} style={{ color: '#10b981' }} />
                            <span className="text-[10px]" style={{ color: '#464544' }}>{feature}</span>
                          </div>
                        ))}
                        {pkg.features.length > 2 && (
                          <span className="text-[10px]" style={{ color: '#1c64f2' }}>
                            +{pkg.features.length - 2} more features
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Custom Amount Section */
              <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #e7e7e6' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Calculator size={16} style={{ color: '#1c64f2' }} />
                  <h3 className="text-sm font-bold" style={{ color: '#111928' }}>Custom Amount</h3>
                </div>

                <div className="mb-4">
                  <label className="text-xs font-medium mb-2 block" style={{ color: '#464544' }}>Credits to add</label>
                  <input
                    type="number"
                    value={customCredits}
                    onChange={(e) => setCustomCredits(Math.max(500, Math.min(100000, parseInt(e.target.value) || 500)))}
                    className="w-full px-3 py-2.5 text-lg font-bold rounded-lg border focus:outline-none focus:ring-2"
                    style={{ borderColor: '#e7e7e6', color: '#111928' }}
                  />
                </div>

                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={customCredits}
                  onChange={(e) => setCustomCredits(parseInt(e.target.value))}
                  className="w-full mb-2"
                  style={{ accentColor: '#1c64f2' }}
                />
                <div className="flex justify-between text-[10px] mb-4" style={{ color: '#706f69' }}>
                  <span>500</span>
                  <span>25K</span>
                  <span>50K</span>
                  <span>75K</span>
                  <span>100K</span>
                </div>

                {/* Tier Progress - Gamification */}
                <div className="p-3 rounded-lg mb-4" style={{ backgroundColor: '#f3f5f5' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium" style={{ color: '#464544' }}>Your Rate Tier</span>
                    <span className="text-xs font-bold" style={{ color: customPricing.savingsPercent > 0 ? '#10b981' : '#706f69' }}>
                      {customPricing.savingsPercent > 0 ? `${customPricing.savingsPercent}% off` : 'Standard rate'}
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#e7e7e6' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${Math.min(100, (customCredits / 75000) * 100)}%`,
                        background: 'linear-gradient(90deg, #1c64f2 0%, #10b981 100%)'
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-[9px]" style={{ color: '#706f69' }}>
                    <span>Standard</span>
                    <span>15K (20% off)</span>
                    <span>40K (30% off)</span>
                    <span>75K (40% off)</span>
                  </div>
                </div>

                {/* Custom Price Summary */}
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#eff6ff' }}>
                  <div>
                    <span className="text-xs" style={{ color: '#706f69' }}>Total Price</span>
                    <p className="text-xl font-bold" style={{ color: '#1c64f2' }}>${customPricing.price}</p>
                  </div>
                  {customPricing.savings > 0 && (
                    <div className="text-right">
                      <span className="text-xs" style={{ color: '#706f69' }}>You save</span>
                      <p className="text-sm font-bold" style={{ color: '#10b981' }}>${customPricing.savings}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Summary Panel - Right Side */}
          <div className="col-span-4">
            {/* Order Summary */}
            <div className="bg-white rounded-xl p-4 mb-4 sticky top-20" style={{ border: '1px solid #e7e7e6' }}>
              <h3 className="text-sm font-bold mb-4" style={{ color: '#111928' }}>Order Summary</h3>

              {!showCustom && selectedPkg ? (
                <>
                  <div className="flex items-center gap-3 p-3 rounded-lg mb-4" style={{ backgroundColor: '#f3f5f5' }}>
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${selectedPkg.color}15`, color: selectedPkg.color }}
                    >
                      <selectedPkg.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: '#111928' }}>{selectedPkg.name} Package</p>
                      <p className="text-xs" style={{ color: '#706f69' }}>{selectedPkg.credits.toLocaleString()} credits</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span style={{ color: '#706f69' }}>Base Credits</span>
                      <span style={{ color: '#111928' }}>{selectedPkg.credits.toLocaleString()}</span>
                    </div>
                    {selectedPkg.bonus > 0 && (
                      <div className="flex justify-between text-xs">
                        <span className="flex items-center gap-1" style={{ color: '#10b981' }}>
                          <Gift size={10} /> Bonus Credits
                        </span>
                        <span style={{ color: '#10b981' }}>+{selectedPkg.bonus.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="h-px" style={{ backgroundColor: '#e7e7e6' }} />
                    <div className="flex justify-between text-xs font-semibold">
                      <span style={{ color: '#111928' }}>Total Credits</span>
                      <span style={{ color: '#1c64f2' }}>{(selectedPkg.credits + selectedPkg.bonus).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span style={{ color: '#706f69' }}>Subtotal</span>
                      <span style={{ color: '#111928' }}>${selectedPkg.price.toFixed(2)}</span>
                    </div>
                    {selectedPkg.savings > 0 && (
                      <div className="flex justify-between text-xs">
                        <span style={{ color: '#10b981' }}>Savings ({selectedPkg.savingsPercent}% off)</span>
                        <span style={{ color: '#10b981' }}>-${selectedPkg.savings.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="h-px" style={{ backgroundColor: '#e7e7e6' }} />
                    <div className="flex justify-between">
                      <span className="text-sm font-bold" style={{ color: '#111928' }}>Total</span>
                      <span className="text-lg font-bold" style={{ color: selectedPkg.color }}>${selectedPkg.price.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              ) : showCustom ? (
                <>
                  <div className="flex items-center gap-3 p-3 rounded-lg mb-4" style={{ backgroundColor: '#f3f5f5' }}>
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: '#eff6ff', color: '#1c64f2' }}
                    >
                      <Calculator size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: '#111928' }}>Custom Amount</p>
                      <p className="text-xs" style={{ color: '#706f69' }}>{customCredits.toLocaleString()} credits</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span style={{ color: '#706f69' }}>Credits</span>
                      <span style={{ color: '#111928' }}>{customCredits.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span style={{ color: '#706f69' }}>Rate</span>
                      <span style={{ color: '#111928' }}>${customPricing.rate}/credit</span>
                    </div>
                    {customPricing.savings > 0 && (
                      <div className="flex justify-between text-xs">
                        <span style={{ color: '#10b981' }}>Savings</span>
                        <span style={{ color: '#10b981' }}>-${customPricing.savings}</span>
                      </div>
                    )}
                    <div className="h-px" style={{ backgroundColor: '#e7e7e6' }} />
                    <div className="flex justify-between">
                      <span className="text-sm font-bold" style={{ color: '#111928' }}>Total</span>
                      <span className="text-lg font-bold" style={{ color: '#1c64f2' }}>${customPricing.price}</span>
                    </div>
                  </div>
                </>
              ) : null}

              <button
                onClick={handlePurchase}
                disabled={isProcessing}
                className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ backgroundColor: '#1c64f2' }}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Pay ${showCustom ? customPricing.price : selectedPkg?.price || 0}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-3 mt-4 pt-4" style={{ borderTop: '1px solid #f3f5f5' }}>
                <div className="flex items-center gap-1 text-[10px]" style={{ color: '#706f69' }}>
                  <Shield size={10} style={{ color: '#10b981' }} />
                  Secure Payment
                </div>
                <div className="flex items-center gap-1 text-[10px]" style={{ color: '#706f69' }}>
                  <Check size={10} style={{ color: '#10b981' }} />
                  Instant Delivery
                </div>
              </div>
            </div>

            {/* What Credits Unlock - Value reminder */}
            <div className="bg-white rounded-xl p-4" style={{ border: '1px solid #e7e7e6' }}>
              <h3 className="text-xs font-bold mb-3 flex items-center gap-2" style={{ color: '#111928' }}>
                <Info size={12} style={{ color: '#1c64f2' }} />
                What you can do with credits
              </h3>
              <div className="space-y-2">
                {creditUseCases.map((useCase, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <useCase.icon size={12} style={{ color: '#706f69' }} />
                      <span className="text-[11px]" style={{ color: '#464544' }}>{useCase.action}</span>
                    </div>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ backgroundColor: '#f3f5f5', color: '#706f69' }}>
                      {useCase.credits} credits
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
