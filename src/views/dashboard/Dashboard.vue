<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          class="card-receita"
          color="info"
          icon="mdi-cash-plus"
          title="Receita"
          value="2.45 Mn"
          sub-icon="mdi-clock"
          sub-text="10h atrás"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          class="card-gpm"
          color="primary"
          icon="mdi-finance"
          title="GPM"
          value="32.5%"
          sub-icon="mdi-clock"
          sub-text="7h atrás"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          class="card-pessoas"
          color="success"
          icon="mdi-account-group"
          title="Pessoas"
          value="47"
          sub-icon="mdi-calendar"
          sub-text="7d atrás"
        />
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="emailsSubscriptionChartChartjs.data"
          :options="emailsSubscriptionChartChartjs.options"
          type="Bar"
          >      

          <div class="d-flex align-center mt-2 ml-2">
            <h4 class="card-title font-weight-light mr-2">Receita por</h4>
            <v-btn-toggle v-model="toggleReceita" dense class="ml-2" color="primary">
              <v-btn value="mes">Mês</v-btn>
              <v-btn value="quarter">Quarter</v-btn>
              <v-btn value="ano">Ano</v-btn>
            </v-btn-toggle>
          </div>
          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            Last Campaign Performance
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">updated 10 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="dailySalesChartChartjs.data"
          :options="dailySalesChartChartjs.options"
          type="Line"
        >


          <div class="d-flex align-center mt-2 ml-2">
            <h4 class="card-title font-weight-light mr-2">GPM por</h4>
            <v-btn-toggle v-model="toggleGpm" dense class="ml-2" color="primary">
              <v-btn value="mes">Mês</v-btn>
              <v-btn value="quarter">Quarter</v-btn>
              <v-btn value="ano">Ano</v-btn>
            </v-btn-toggle>
          </div>
          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            <v-icon
              color="green"
              small
            >
              mdi-arrow-up
            </v-icon>
            <span class="green--text">55%</span>&nbsp;
            increase in today's sales
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="dataCompletedTasksChartChartjs.data"
          :options="dataCompletedTasksChartChartjs.options"
          type="Line"
        >


          <div class="d-flex align-center mt-2 ml-2">
            <h3 class="card-title font-weight-light mr-2">Pessoas por</h3>
            <v-btn-toggle v-model="togglePessoas" dense class="ml-2" color="primary">
              <v-btn value="mes">Mês</v-btn>
              <v-btn value="quarter">Quarter</v-btn>
              <v-btn value="ano">Ano</v-btn>
            </v-btn-toggle>
          </div>
          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            +10 novos associados
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">campaign sent 26 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col cols="12" md="6">
        <base-material-card color="warning" class="px-5 py-3">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">Últimas atualizações</div>
            <div class="subtitle-1 font-weight-light">Atualizações de receita e custo</div>
          </template>
          <v-card-text>
            <v-data-table :headers="headers" :items="items" />
          </v-card-text>
        </base-material-card>
      </v-col>
      <v-col cols="12" md="6">
        <base-material-card color="warning" class="px-5 py-3">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">Últimas atualizações</div>
            <div class="subtitle-1 font-weight-light">Atualizações de receita e custo</div>
          </template>
          <v-card-text>
            <v-data-table :headers="headers" :items="items" />
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        toggleReceita: 'mes',
        toggleGpm: 'mes',
        togglePessoas: 'mes',
        dailySalesChartChartjs: {
          data: {
            labels: ['Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set'],
            datasets: [
              {
                label: 'GPM',
                backgroundColor: 'rgba(76,175,80,0.2)',
                borderColor: 'rgba(76,175,80,1)',
                data: [12, 17, 7, 17, 23, 18],
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: { beginAtZero: true, max: 35 },
              }],
            },
          },
        },
        dataCompletedTasksChartChartjs: {
          data: {
            labels: ['Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set'],
            datasets: [
              {
                label: 'Pessoas',
                backgroundColor: 'rgba(33,150,243,0.2)',
                borderColor: 'rgba(33,150,243,1)',
                data: [470, 472, 474, 483, 499, 506],
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: { beginAtZero: true, max: 550 },
              }],
            },
          },
        },
        emailsSubscriptionChartChartjs: {
          data: {
            labels: ['Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set'],
            datasets: [
              {
                label: 'Receita',
                backgroundColor: 'rgba(233,30,99,0.2)',
                borderColor: 'rgba(233,30,99,1)',
                data: [542, 443, 320, 780, 553, 453],
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: { beginAtZero: true, max: 700 },
              }],
              xAxes: [{
                gridLines: { display: false },
              }],
            },
          },
        },
        headers: [
          {
            sortable: false,
            text: 'ID',
            value: 'id',
          },
          {
            sortable: false,
            text: 'Nome',
            value: 'name',
          },
          {
            sortable: false,
            text: 'Projeto',
            value: 'salary',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Gestor',
            value: 'country',
            align: 'right',
          },

        ],
        items: [
          {
            id: 1,
            name: 'Dakota Rice',
            country: 'Niger',
            city: 'Oud-Tunrhout',
            salary: '$35,738',
          },
          {
            id: 2,
            name: 'Minerva Hooper',
            country: 'Curaçao',
            city: 'Sinaai-Waas',
            salary: '$23,738',
          },
          {
            id: 3,
            name: 'Sage Rodriguez',
            country: 'Netherlands',
            city: 'Overland Park',
            salary: '$56,142',
          },
          {
            id: 4,
            name: 'Philip Chanley',
            country: 'Korea, South',
            city: 'Gloucester',
            salary: '$38,735',
          },
          {
            id: 5,
            name: 'Doris Greene',
            country: 'Malawi',
            city: 'Feldkirchen in Kārnten',
            salary: '$63,542',
          },
        ],
        
        tabs: 0,
       
        list: {
          0: false,
          1: false,
          2: false,
        },
      }
    },

    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
    },
  }
</script>
