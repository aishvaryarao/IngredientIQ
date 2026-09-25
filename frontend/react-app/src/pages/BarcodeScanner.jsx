import { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProfileContext } from '../App';
import { scanBarcode } from '../api/client';
import IngredientChart from '../components/IngredientChart';
import IngredientCard from '../components/IngredientCard';
import WarningCard from '../components/WarningCard';
import GradeBadge from '../components/GradeBadge';

function BarcodeScanner() {
  const { profiles, selectedProfiles, setSelectedProfiles } =
    useContext(ProfileContext);

  const [searchParams] = useSearchParams();
  const [barcode, setBarcode] = useState(searchParams.get('barcode') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const colors = {
    background: '#F4EDE3',
    surface: '#FBF8F3',
    espresso: '#3A2921',
    deepEspresso: '#291B16',
    muted: '#795F52',
    border: '#DCCFC2',
    soft: '#EDE1D4',
    disabled: '#C9BDB2',
  };

  const handleAnalyze = async () => {
    if (!barcode.trim()) {
      setError('Please enter a barcode');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const response = await scanBarcode(barcode, selectedProfiles);
    setLoading(false);

    if (response.error) {
      setError(response.error);
    } else {
      setResult(response.data);
    }
  };

  const handleProfileToggle = (profileId) => {
    setSelectedProfiles((prev) =>
      prev.includes(profileId)
        ? prev.filter((p) => p !== profileId)
        : [...prev, profileId]
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleAnalyze();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: colors.background,
      }}
    >
      {/* Left Panel */}
      <div
        style={{
          flex: '0 0 40%',
          padding: '40px',
          backgroundColor: colors.surface,
          borderRight: `1px solid ${colors.border}`,
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 64px)',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '6px 14px',
            marginBottom: '16px',
            borderRadius: '20px',
            backgroundColor: colors.soft,
            color: colors.muted,
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.4px',
          }}
        >
          PRODUCT ANALYSIS
        </div>

        <h1
          style={{
            fontSize: '30px',
            fontWeight: 700,
            marginBottom: '32px',
            color: colors.deepEspresso,
            letterSpacing: '-0.5px',
          }}
        >
          Barcode Entry
        </h1>

        {/* Barcode Input */}
        <div style={{ marginBottom: '32px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '8px',
              color: colors.espresso,
            }}
          >
            Product Barcode
          </label>

          <input
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., 5010724154018"
            style={{
              width: '100%',
              padding: '13px 14px',
              borderRadius: '8px',
              border: `1px solid ${colors.border}`,
              backgroundColor: '#FFFFFF',
              color: colors.espresso,
              fontSize: '14px',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />

          <p
            style={{
              fontSize: '12px',
              color: colors.muted,
              marginTop: '7px',
              lineHeight: 1.5,
            }}
          >
            Find the barcode on your product packaging, usually 12–14 digits.
          </p>
        </div>

        {/* Profile Selection */}
        <div style={{ marginBottom: '32px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '12px',
              color: colors.espresso,
            }}
          >
            Your Health Profile
          </label>

          <p
            style={{
              fontSize: '12px',
              color: colors.muted,
              marginBottom: '12px',
            }}
          >
            Select all that apply.
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            {profiles.map((profile) => (
              <label
                key={profile.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: selectedProfiles.includes(profile.id)
                    ? colors.soft
                    : 'transparent',
                  border: selectedProfiles.includes(profile.id)
                    ? `1px solid ${colors.border}`
                    : '1px solid transparent',
                  transition: 'all 0.2s ease',
                  color: colors.espresso,
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedProfiles.includes(profile.id)}
                  onChange={() => handleProfileToggle(profile.id)}
                  style={{
                    cursor: 'pointer',
                    accentColor: colors.espresso,
                  }}
                />

                <span style={{ fontSize: '14px', fontWeight: 500 }}>
                  {profile.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: loading ? colors.disabled : colors.espresso,
            color: colors.surface,
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = colors.deepEspresso;
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = colors.espresso;
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          {loading ? 'Analyzing...' : 'Analyze Product'}
        </button>
      </div>

      {/* Right Panel */}
      <div
        style={{
          flex: '0 0 60%',
          padding: '40px',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 64px)',
        }}
      >
        {/* Error */}
        {error && (
          <div
            style={{
              padding: '16px',
              backgroundColor: '#FCE8E6',
              borderLeft: '4px solid #B94A48',
              borderRadius: '8px',
              marginBottom: '24px',
            }}
          >
            <p
              style={{
                margin: 0,
                color: '#8A302E',
                fontSize: '14px',
              }}
            >
              {error}
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                border: `3px solid ${colors.border}`,
                borderTop: `3px solid ${colors.espresso}`,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 16px',
              }}
            />

            <p
              style={{
                color: colors.muted,
                fontSize: '16px',
              }}
            >
              Analyzing product...
            </p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div>
            {/* Product Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '32px',
                gap: '20px',
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    margin: '0 0 8px 0',
                    color: colors.deepEspresso,
                  }}
                >
                  {result.product_name || 'Unknown Product'}
                </h2>

                <p
                  style={{
                    fontSize: '14px',
                    color: colors.muted,
                    margin: 0,
                  }}
                >
                  Barcode:{' '}
                  <code
                    style={{
                      backgroundColor: colors.soft,
                      color: colors.espresso,
                      padding: '3px 7px',
                      borderRadius: '4px',
                    }}
                  >
                    {barcode}
                  </code>
                </p>
              </div>

              <GradeBadge
                grade={result.grade}
                size="lg"
                score={result.safety_score}
              />
            </div>

            {/* Charts */}
            {result.ingredients && result.ingredients.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <IngredientChart ingredients={result.ingredients} />
              </div>
            )}

            {/* Warnings */}
            {result.warnings && result.warnings.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    marginBottom: '16px',
                    color: colors.espresso,
                  }}
                >
                  Warnings
                </h3>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  {result.warnings.map((warning, idx) => (
                    <WarningCard key={idx} warning={warning} />
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients */}
            {result.ingredients && result.ingredients.length > 0 && (
              <div>
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    marginBottom: '16px',
                    color: colors.espresso,
                  }}
                >
                  All Ingredients ({result.ingredients.length})
                </h3>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '16px',
                  }}
                >
                  {result.ingredients.map((ingredient, idx) => (
                    <IngredientCard
                      key={idx}
                      ingredient={ingredient}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!result && !loading && !error && (
          <div
            style={{
              textAlign: 'center',
              padding: '100px 20px',
              color: colors.muted,
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 24px',
                borderRadius: '50%',
                backgroundColor: colors.soft,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.espresso,
                fontSize: '24px',
                fontWeight: 600,
              }}
            >
              IQ
            </div>

            <h3
              style={{
                color: colors.espresso,
                fontSize: '20px',
                marginBottom: '8px',
              }}
            >
              Ready to analyze
            </h3>

            <p
              style={{
                fontSize: '14px',
                maxWidth: '380px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              Enter a product barcode and analyze its ingredients and safety
              profile.
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default BarcodeScanner;