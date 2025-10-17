# /backend

- replace **/engine/fingerprinting.py** with the actual fingerprinting logic
- modify **/engine/spotify_parser.py** to also accept playlist links
- write the pipeline for querying (**/pipeline/match.py**) and update /match route in **routes.py**
- note the match SQL query in **setup.sql**

# FRONTEND

- components:

  - **MicInput**
  - **Search**
  - **Popup**
  - **ArrayInput**
  - **Logger**

- pages:
  - **Client**: **Input**, **List**, **ListItems**
  - **Dashboard**: **ArrayInput**, **Logger**
