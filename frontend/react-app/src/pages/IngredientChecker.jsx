import { useContext, useState } from 'react';
import { ProfileContext } from '../App';
import { analyzeIngredients } from '../api/client';
import IngredientCard from '../components/IngredientCard';
import GradeBadge from '../components/GradeBadge';

function IngredientChecker() {
  const {
    profiles,
    selectedProfiles,
    setSelectedProfiles,
  } = useContext(ProfileContext);

  const [ingredientText, setIngredientText] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
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

  const exampleIngredients = [
    {
      name: 'Water, Glycerin, Cetyl Alcohol, Stearic Acid, Petrolatum',
      label: 'Basic Moisturizer',
    },
    {
      name: 'Water, Butylene Glycol, Niacinamide, Mica, CI 77891',
      label: 'Tinted Serum',
    },
    {
      name: 'Aqua, Paraben, Lead Acetate, Titanium Dioxide, Talc',
      label: 'Budget Powder',
    },
  ];

  const handleAnalyze = async () => {
    if (!ingredientText.trim()) {
      setError('Please enter or select ingredients');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setProgress(0);

    setProgress(50);

    const response = await analyzeIngredients(
      ingredientText,
      selectedProfiles
    );

    if (response.error || !response.data) {
      setError(response.error || 'Failed to analyze ingredients');
      setLoading(false);
      return;
    }

    const allResults = response.data.ingredients || [];
    const warnings = response.data.warnings || [];

    let totalScore = 0;

    const hazardousCounts = {
      SAFE: 0,
      MODERATE: 0,
      HAZARDOUS: 0,
    };

    for (const ingredient of allResults) {
      totalScore += ingredient.ewg_score || 0;

      const safetyLabel = ingredient.safety_label;

      hazardousCounts[safetyLabel] =
        (hazardousCounts[safetyLabel] || 0) + 1;
    }

    setProgress(100);
    setLoading(false);

    const averageScore =
      allResults.length > 0
        ? totalScore / allResults.length
        : 0;

    let grade = 'A';

    if (hazardousCounts.HAZARDOUS > 0) {
      grade = 'F';
    } else if (
      hazardousCounts.MODERATE >
      allResults.length * 0.5
    ) {
      grade = 'C';
    } else if (hazardousCounts.MODERATE > 0) {
      grade = 'B';
    }

    setResult({
      grade,
      safety_score:
        Math.round((10 - averageScore / 10) * 100) / 100,
      ingredients: allResults,
      warnings,
      distribution: hazardousCounts,
    });
  };

  const handleProfileToggle = (profileId) => {
    setSelectedProfiles((prev) =>
      prev.includes(profileId)
        ? prev.filter((p) => p !== profileId)
        : [...prev, profileId]
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey && !loading) {
      handleAnalyze();
    }
  };

  const topConcerns = result
    ? result.ingredients
        .filter((ing) => ing.safety_level !== 'SAFE')
        .sort(
          (a, b) =>
            (b.ewg_score || 0) - (a.ewg_score || 0)
        )
        .slice(0, 5)
    : [];

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
          INGREDIENT ANALYSIS
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
          Ingredient Checker
        </h1>

        {/* Ingredient Textarea */}
        <div style={{ marginBottom: '28px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '8px',
              color: colors.espresso,
            }}
          >
            Ingredients List
          </label>

          <textarea
            value={ingredientText}
            onChange={(e) => setIngredientText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Water, Glycerin, Cetyl Alcohol, Stearic Acid..."
            style={{
              width: '100%',
              height: '150px',
              padding: '13px 14px',
              borderRadius: '8px',
              border: `1px solid ${colors.border}`,
              backgroundColor: '#FFFFFF',
              color: colors.espresso,
              fontSize: '14px',
              fontFamily: 'DM Sans, sans-serif',
              boxSizing: 'border-box',
              resize: 'none',
              outline: 'none',
              lineHeight: 1.6,
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
            Paste or type ingredients separated by commas.
            Use Ctrl+Enter to analyze.
          </p>
        </div>

        {/* Example Buttons */}
        <div style={{ marginBottom: '28px' }}>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: colors.muted,
              marginBottom: '9px',
            }}
          >
            Quick Examples
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '7px',
            }}
          >
            {exampleIngredients.map((example, idx) => (
              <button
                key={idx}
                onClick={() => setIngredientText(example.name)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  backgroundColor: colors.surface,
                  color: colors.espresso,
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    colors.soft;
                  e.currentTarget.style.borderColor =
                    colors.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    colors.surface;
                  e.currentTarget.style.borderColor =
                    colors.border;
                }}
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Selection */}
        <div style={{ marginBottom: '30px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '8px',
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
                  backgroundColor:
                    selectedProfiles.includes(profile.id)
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
                  onChange={() =>
                    handleProfileToggle(profile.id)
                  }
                  style={{
                    cursor: 'pointer',
                    accentColor: colors.espresso,
                  }}
                />

                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
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
            backgroundColor: loading
              ? colors.disabled
              : colors.espresso,
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
              e.currentTarget.style.backgroundColor =
                colors.deepEspresso;
              e.currentTarget.style.transform =
                'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor =
                colors.espresso;
              e.currentTarget.style.transform =
                'translateY(0)';
            }
          }}
        >
          {loading
            ? `Analyzing ${Math.round(progress)}%`
            : 'Analyze Ingredients'}
        </button>

        {/* Progress Bar */}
        {loading && (
          <div style={{ marginTop: '16px' }}>
            <div
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: colors.border,
                borderRadius: '3px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  backgroundColor: colors.espresso,
                  width: `${progress}%`,
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        )}
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
              padding: '100px 20px',
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
              Analyzing ingredients...
            </p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div>
            {/* Header */}
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
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: colors.muted,
                    letterSpacing: '0.5px',
                    marginBottom: '7px',
                  }}
                >
                  ANALYSIS COMPLETE
                </div>

                <h2
                  style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    margin: 0,
                    color: colors.deepEspresso,
                  }}
                >
                  Analysis Results
                </h2>
              </div>

              <GradeBadge
                grade={result.grade}
                size="lg"
                score={result.safety_score}
              />
            </div>

            {/* Top Concerns */}
            {topConcerns.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    marginBottom: '16px',
                    color: colors.espresso,
                  }}
                >
                  Top Concerns
                </h3>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  {topConcerns.map((ingredient, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '14px 16px',
                        backgroundColor: '#F8EDEC',
                        borderLeft: '4px solid #B94A48',
                        borderRadius: '8px',
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 600,
                          color: '#7F302E',
                        }}
                      >
                        {ingredient.name}
                      </div>

                      <div
                        style={{
                          fontSize: '12px',
                          color: '#9B4B49',
                          marginTop: '4px',
                        }}
                      >
                        EWG Score: {ingredient.ewg_score}/10 •{' '}
                        {ingredient.safety_level}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Safety Distribution */}
            <div
              style={{
                padding: '22px',
                backgroundColor: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: '12px',
                marginBottom: '32px',
              }}
            >
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: colors.espresso,
                  marginBottom: '18px',
                }}
              >
                Safety Distribution
              </h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(3, 1fr)',
                  gap: '16px',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: colors.muted,
                      marginBottom: '4px',
                    }}
                  >
                    Safe
                  </div>

                  <div
                    style={{
                      fontSize: '26px',
                      fontWeight: 700,
                      color: '#4F8061',
                    }}
                  >
                    {result.distribution.SAFE}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: colors.muted,
                      marginBottom: '4px',
                    }}
                  >
                    Moderate
                  </div>

                  <div
                    style={{
                      fontSize: '26px',
                      fontWeight: 700,
                      color: '#A87532',
                    }}
                  >
                    {result.distribution.MODERATE}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: colors.muted,
                      marginBottom: '4px',
                    }}
                  >
                    Hazardous
                  </div>

                  <div
                    style={{
                      fontSize: '26px',
                      fontWeight: 700,
                      color: '#A94A47',
                    }}
                  >
                    {result.distribution.HAZARDOUS}
                  </div>
                </div>
              </div>
            </div>

            {/* All Ingredients */}
            {result.ingredients.length > 0 && (
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
                      'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '16px',
                  }}
                >
                  {result.ingredients.map(
                    (ingredient, idx) => (
                      <IngredientCard
                        key={idx}
                        ingredient={ingredient}
                      />
                    )
                  )}
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
                fontSize: '18px',
                fontWeight: 700,
                letterSpacing: '1px',
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
              Enter ingredients on the left to see their
              safety analysis and personalized insights.
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

export default IngredientChecker;