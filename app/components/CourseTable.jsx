'use client';

export default function CourseTable() {
  return (
    <div className="table-wrap" id="tableWrap">
      <table className="table" id="courseTable" role="table" aria-label="Courses">
        <colgroup>
          <col className="col-course" />
          <col className="col-sec" />
          <col className="col-time" />
          <col className="col-faculty" />
          <col className="col-title" />
          <col className="col-seats" />
          <col className="col-actions" />
        </colgroup>
        <thead>
          <tr>
            <th>Course</th>
            <th>Sec</th>
            <th>Days/Time</th>
            <th>Faculty</th>
            <th>Title</th>
            <th className="right">Enrolled</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="courseTbody">
          <tr>
            <td colSpan="7" className="small">
              Loading courses...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
