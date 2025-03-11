$(document).ready(() => {
  // Load repository information
  $.ajax({
    url: "/api/repository",
    method: "GET",
    dataType: "json",
    success: (data) => {
      $("#repo-name").text(data.name)
      $("#repo-description").text(data.description)
      document.title = data.name + " - Bitcoin Core Explorer"
    },
    error: (xhr, status, error) => {
      console.error("Error loading repository information:", error)
      $("#repo-name").text("Error loading repository")
      $("#repo-description").text("Could not load repository information. Please try again later.")
    },
  })

  // Load maintainers
  $.ajax({
    url: "/api/maintainers",
    method: "GET",
    dataType: "json",
    success: (data) => {
      const $maintainersList = $("#maintainers-list")
      $maintainersList.empty()

      if (data.length === 0) {
        $maintainersList.append('<li class="list-group-item">No maintainers found</li>')
        return
      }

      data.forEach((maintainer) => {
        $maintainersList.append(`
                    <li class="list-group-item">
                        <strong>${maintainer.name}</strong><br>
                        <small class="text-muted">${maintainer.email}</small>
                    </li>
                `)
      })
    },
    error: (xhr, status, error) => {
      console.error("Error loading maintainers:", error)
      $("#maintainers-list").html('<li class="list-group-item">Error loading maintainers</li>')
    },
  })

  // Load pull requests for each tab
  loadPullRequests("open")

  // Load other PR lists when tab is clicked
  $("#prTabs button").on("click", function (e) {
    const status = $(this).attr("id").replace("-tab", "")
    loadPullRequests(status)
  })

  function loadPullRequests(status) {
    const $prList = $(`#${status}-prs-list`)

    // Check if already loaded
    if ($prList.data("loaded")) {
      return
    }

    $.ajax({
      url: `/api/pull-requests?status=${status}`,
      method: "GET",
      dataType: "json",
      success: (data) => {
        $prList.empty()

        if (data.length === 0) {
          $prList.append(`<div class="list-group-item">No ${status} pull requests found</div>`)
          return
        }

        data.forEach((pr) => {
          const openedDate = new Date(pr.openedAt).toLocaleDateString()
          let statusDate = ""

          if (status === "closed" && pr.closedAt) {
            statusDate = `<span class="text-muted">Closed on ${new Date(pr.closedAt).toLocaleDateString()}</span>`
          } else if (status === "merged" && pr.mergedAt) {
            statusDate = `<span class="text-muted">Merged on ${new Date(pr.mergedAt).toLocaleDateString()}</span>`
          }

          $prList.append(`
                        <a href="pull-request.html?id=${pr.id}" class="list-group-item list-group-item-action pr-item">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">#${pr.number} ${pr.title}</h5>
                                <small>${openedDate}</small>
                            </div>
                            <p class="mb-1">Opened by ${pr.author.name}</p>
                            ${statusDate}
                        </a>
                    `)
        })

        $prList.data("loaded", true)
      },
      error: (xhr, status, error) => {
        console.error(`Error loading ${status} pull requests:`, error)
        $prList.html(`<div class="list-group-item">Error loading ${status} pull requests</div>`)
      },
    })
  }
})

