const perspectiveID = 'perspective3'

export const eventProperties = `
    {
      ?id a ?type__id .
      ?id crm:P9_consists_of/a ?type__prefLabel .
      BIND(?type__id as ?prefLabel__id)
      BIND(?type__prefLabel as ?prefLabel__prefLabel)
      BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?type__dataProviderUrl)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
    UNION
    {
      ?id crm:P9_consists_of ?event .
      ?collection__id crm:P24i_changed_ownership_through|crm:P30i_custody_transferred_through ?event .
      ?collection__id dct:title ?collection__prefLabel .
    }
    UNION
    {
      ?id crm:P9_consists_of/crm:P4_has_time-span ?eventTimespan__id .
      OPTIONAL { ?eventTimespan__id crm:P82a_begin_of_the_begin ?eventTimespan__start }
      OPTIONAL { ?eventTimespan__id crm:P82b_end_of_the_end ?eventTimespan__end }
      BIND(CONCAT(STR(?eventTimespan__start), " --- " , STR(?eventTimespan__end) ) AS ?eventTimespan__prefLabel)
    }
    UNION
    {
      ?id crm:P9_consists_of/ crm:P23_transferred_title_from|crm:P28_Custody_Surrendered_by ?surrender__id .
      ?surrender__id rdfs:label ?surrender__prefLabel .
    }
    UNION
    {
      ?id crm:P9_consists_of/ crm:P22_transferred_title_to|crm:P29_Custody_Recieved_By ?receiver__id .
      BIND(?receiver__id AS ?receiver__prefLabel)
    }
    
`

export const eventPlacesQuery = `
  SELECT ?id ?lat ?long
  (COUNT(DISTINCT ?event) as ?instanceCount)
  WHERE {
    <FILTER>
    VALUES ?eventType { crm:E10_Transfer_of_Custody crm:E12_Production mmm-schema:ManuscriptActivity }
    ?event crm:P7_took_place_at ?id ;
           a ?eventType .
    ?id wgs84:lat ?lat ;
        wgs84:long ?long .
  }
  GROUP BY ?id ?lat ?long
`

export const eventsByTimePeriodQuery = `
  SELECT ?id ?type__id ?type__prefLabel
  (COUNT(DISTINCT ?event) as ?type__instanceCount)
  WHERE {
    <FILTER>
    <TIME_PERIODS>
  }
  GROUP BY ?id ?type__id ?type__prefLabel
  ORDER BY ?id
`

export const eventsByTimePeriodQuery2 = `
  SELECT ?id ?prefLabel ?period ?instanceCount
  WHERE {
    <FILTER>
    <TIME_PERIODS>
  }
`

export const placePropertiesInfoWindow = `
    ?id skos:prefLabel ?prefLabel__id .
    BIND(?prefLabel__id AS ?prefLabel__prefLabel)
    BIND(CONCAT("/places/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
`
