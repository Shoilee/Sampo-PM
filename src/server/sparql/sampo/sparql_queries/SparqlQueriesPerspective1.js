const perspectiveID = 'perspective1'

export const workProperties = `
    {
      ?id dct:title ?prefLabel__id .
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
  UNION
  {
    ?id crm:P108i_was_produced_by/crm:P7_took_place_at ?productionPlace__id .
    ?productionPlace__id skos:prefLabel ?productionPlace__prefLabel .
  }
  UNION
  {
    ?id crm:P65_shows_visual_item ?i_BNODE .
    ?i_BNODE a crm:E36_Visual_Item .
    ?i_BNODE <https://linked.art/ns/terms/digitally_shown_by> ?image__id.
    ?image__id <https://linked.art/ns/terms/access_point> ?image__url .
  }
  UNION
  {
    ?id crm:P24i_changed_ownership_through ?acquisitionType__id.
    ?acquisitionType__id rdfs:label ?acquisitionType__prefLabel .
  }
  UNION
  {
    ?id crm:P108i_was_produced_by/crm:P4_has_time-span ?productionTimeSpan__id.
    ?productionTimeSpan__id crm:P82a_begin_of_the_begin ?productionTimeSpan__start .
    ?productionTimeSpan__id crm:P82b_end_of_the_end ?productionTimeSpan__end .
    BIND(CONCAT(STR(?productionTimeSpan__start), " --- " , STR(?productionTimeSpan__end) ) AS ?productionTimeSpan__prefLabel)
  }
  UNION
  {
    ?id crm:P24i_changed_ownership_through/crm:P4_has_time-span ?acquisitionTimeSpan__id.
    ?acquisitionTimeSpan__id crm:P82a_begin_of_the_begin ?acquisitionTimeSpan__start .
    ?acquisitionTimeSpan__id crm:P82b_end_of_the_end ?acquisitionTimeSpan__end .
    BIND(CONCAT(STR(?acquisitionTimeSpan__start), " --- " , STR(?acquisitionTimeSpan__end) ) AS ?acquisitionTimeSpan__prefLabel)
  }
  UNION
  {
    ?id crm:P24i_changed_ownership_through/crm:P23_transferred_title_from ?transferedTitleFrom__id.
    ?transferedTitleFrom__id rdfs:label ?transferedTitleFrom__prefLabel .
  }

`

export const knowledgeGraphMetadataQuery = `
  SELECT * 
  WHERE {
    ?id a sd:Dataset ;
        dct:title ?title ;
        dct:publisher ?publisher ;
        dct:rightsHolder ?rightsHolder ;
        dct:modified ?modified ;
        dct:source ?databaseDump__id .
    ?databaseDump__id skos:prefLabel ?databaseDump__prefLabel ;
                      mmm-schema:data_provider_url ?databaseDump__dataProviderUrl ;
                      dct:modified ?databaseDump__modified .
  }
`
