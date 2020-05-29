function sumParcelAreas (parcels) {
  // Parcel areas specified as Hectares to at least 5 decimal places.
  // Convert to integers for accurate sum, then convert the result back to Hectares.
  const milliHectareFactor = 1000000

  const milliHectares = parcels.reduce(
    (totalArea, parcel) => totalArea + parcel.hectares * milliHectareFactor,
    0
  )

  return (milliHectares / milliHectareFactor)
}

function getBusinessViewModel ({ business: { name, sbi }, existingSchemes, parcels }) {
  const existingSchemesTableDefinition = existingSchemes.length === 0 ? undefined : {
    caption: 'Your existing schemes',
    firstCellIsHeader: false,
    head: [
      { text: 'Scheme ID' },
      { text: 'Start date' },
      { text: 'End date' }
    ],
    rows: existingSchemes.map(agreement => ([
      { text: agreement.schemeId },
      { text: agreement.dateStart },
      { text: agreement.dateEnd }
    ]))
  }

  const parcelsTableDefinition = parcels.length === 0 ? undefined : {
    caption: 'Your land parcels',
    firstCellIsHeader: false,
    head: [
      { text: 'Parcel ID' },
      { text: 'Area (ha)' }
    ],
    rows: parcels.map(parcel => [
      { text: parcel.parcelId },
      { text: parcel.hectares.toFixed(4) }
    ])
  }

  const holdingHectares = sumParcelAreas(parcels).toFixed(4)

  const summaryTableDefinition = {
    caption: 'Your business',
    firstCellIsHeader: true,
    rows: [
      [
        { text: 'SBI' },
        { text: sbi }
      ],
      [
        { text: 'Registered holdings' },
        { text: holdingHectares > 0 ? `${holdingHectares} ha` : 'None' }
      ],
      [
        { text: 'Registered parcels' },
        { text: parcels.length }
      ]
    ]
  }

  return {
    business: {
      name,
      sbi
    },
    existingSchemesTableDefinition,
    parcelsTableDefinition,
    summaryTableDefinition
  }
}

module.exports = getBusinessViewModel
