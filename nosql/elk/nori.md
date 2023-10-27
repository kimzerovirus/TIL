## nori 인덱스 생성

```json
PUT nori_test
{
  "settings": {
    "analysis" : {
      "analyzer": {
        "nori": {
          "type": "custom",
          "tokenizer": "nori_mixed"
        }
      }, 
      "tokenizer": {
        "nori_mixed": {
          "type": "nori_tokenizer",
          "decompound_mode": "mixed"
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "nori_title" : {
        "type" : "text",
        "fields" : {
          "keyword" : {
            "type" : "keyword",
            "ignore_above" : 256
          }
        },
        "analyzer" : "nori"
      },
      "title" : {
        "type" : "text",
        "fields" : {
          "keyword" : {
            "type" : "keyword",
            "ignore_above" : 256
          }
        }
      }
    }
  }
}
```
